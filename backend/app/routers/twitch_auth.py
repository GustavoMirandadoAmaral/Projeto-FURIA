from fastapi import APIRouter, Request, HTTPException
from fastapi.responses import RedirectResponse
import httpx
from app.config import settings

router = APIRouter()

CLIENT_ID = settings.twitch_client_id
CLIENT_SECRET = settings.twitch_client_secret
REDIRECT_URI = "http://localhost:8000/twitch/callback"  # ajuste conforme necessário
SCOPES = "user:read:follows"

# Endpoint que inicia o processo de autenticação
@router.get("/twitch/login")
async def twitch_login():
    auth_url = (
        f"https://id.twitch.tv/oauth2/authorize"
        f"?client_id={CLIENT_ID}"
        f"&redirect_uri={REDIRECT_URI}"
        f"&response_type=code"
        f"&scope={SCOPES}"
    )
    return RedirectResponse(auth_url)

# Callback do Twitch após o usuário autorizar
@router.get("/twitch/callback")
async def twitch_callback(request: Request):
    code = request.query_params.get("code")
    if not code:
        raise HTTPException(status_code=400, detail="Código de autorização não encontrado.")

    # Troca o code por um access_token
    token_url = "https://id.twitch.tv/oauth2/token"
    async with httpx.AsyncClient() as client:
        token_response = await client.post(
            token_url,
            data={
                "client_id": CLIENT_ID,
                "client_secret": CLIENT_SECRET,
                "code": code,
                "grant_type": "authorization_code",
                "redirect_uri": REDIRECT_URI,
            }
        )

    if token_response.status_code != 200:
        raise HTTPException(status_code=token_response.status_code, detail="Falha ao obter token. " + token_response.text)

    token_data = token_response.json()
    access_token = token_data.get("access_token")

    # Usa o access_token para pegar dados do usuário
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Client-Id": CLIENT_ID,
    }
    async with httpx.AsyncClient() as client:
        # Obter informações do usuário
        user_response = await client.get("https://api.twitch.tv/helix/users", headers=headers)

    if user_response.status_code != 200:
        raise HTTPException(status_code=user_response.status_code, detail="Falha ao buscar usuário. " + user_response.text)

    user_info = user_response.json().get("data", [])
    if not user_info:
        raise HTTPException(status_code=404, detail="Informações do usuário não encontradas.")

    user_info = user_info[0]  # Assumindo que é sempre um único usuário, mas pode haver mais

    # Obter os streamers seguidos pelo usuário
    async with httpx.AsyncClient() as client:
        followed_streams_response = await client.get(
            "https://api.twitch.tv/helix/users/follows",
            headers=headers,
            params={"from_id": user_info["id"]}
        )

    if followed_streams_response.status_code != 200:
        raise HTTPException(status_code=followed_streams_response.status_code, detail="Falha ao buscar streams seguidos. " + followed_streams_response.text)

    followed_streams = followed_streams_response.json().get("data", [])
    if not followed_streams:
        raise HTTPException(status_code=404, detail="Nenhum streamer seguido encontrado.")

    # Debug: Verificar as informações de streams seguidos
    print(f"Streamers seguidos: {followed_streams}")

    # Exibe ou retorna os streamers seguidos
    streamers_seguidos = [stream["to_name"] for stream in followed_streams]

    # Redireciona para o frontend com sucesso e os streamers seguidos
    frontend_url = f"http://localhost:3000/redes-sociais?twitch=success&followed_streams={','.join(streamers_seguidos)}"
    return RedirectResponse(url=frontend_url)
