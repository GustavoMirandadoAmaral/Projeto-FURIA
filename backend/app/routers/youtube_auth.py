from fastapi import APIRouter, Request
from fastapi.responses import RedirectResponse
from app.config import settings
import httpx
import urllib.parse

router = APIRouter(prefix="/auth/youtube", tags=["YouTube Auth"])

# Endpoint para iniciar o fluxo de autenticação
@router.get("/login")
async def login():
    params = {
        "client_id": settings.youtube_client_id,
        "redirect_uri": settings.youtube_redirect_uri,
        "response_type": "code",
        "scope": "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
        "access_type": "offline",
        "prompt": "consent"
    }
    url = f"https://accounts.google.com/o/oauth2/v2/auth?{urllib.parse.urlencode(params)}"
    return RedirectResponse(url)

# Endpoint de callback para receber o código de autorização
@router.get("/callback")
async def callback(request: Request):
    code = request.query_params.get("code")
    if not code:
        return {"error": "Código de autorização não fornecido"}

    token_url = "https://oauth2.googleapis.com/token"
    data = {
        "code": code,
        "client_id": settings.youtube_client_id,
        "client_secret": settings.youtube_client_secret,
        "redirect_uri": settings.youtube_redirect_uri,
        "grant_type": "authorization_code"
    }

    async with httpx.AsyncClient() as client:
        token_response = await client.post(token_url, data=data)
        token_json = token_response.json()

        access_token = token_json.get("access_token")
        if not access_token:
            return {"error": "Falha ao obter o token de acesso"}

        # Obter informações do usuário
        userinfo_url = "https://www.googleapis.com/oauth2/v1/userinfo"
        headers = {"Authorization": f"Bearer {access_token}"}
        userinfo_response = await client.get(userinfo_url, headers=headers)
        userinfo = userinfo_response.json()

    return userinfo
