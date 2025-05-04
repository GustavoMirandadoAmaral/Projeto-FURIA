import httpx

async def get_user_id(access_token: str, client_id: str):
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Client-Id": client_id,
    }
    async with httpx.AsyncClient() as client:
        response = await client.get("https://api.twitch.tv/helix/users", headers=headers)
        if response.status_code != 200:
            raise Exception(f"Erro ao obter o ID do usuário: {response.status_code} - {response.text}")
        data = response.json()
        if "data" not in data or not data["data"]:
            raise Exception("Dados do usuário não encontrados na resposta da Twitch.")
        return data["data"][0]["id"]

async def check_if_follows(access_token: str, client_id: str, user_id: str, furia_channel_id: str = "587620441"):
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Client-Id": client_id,
    }
    url = f"https://api.twitch.tv/helix/users/follows?from_id={user_id}&to_id={furia_channel_id}"
    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=headers)
        if response.status_code != 200:
            raise Exception(f"Erro ao verificar se o usuário segue o canal: {response.status_code} - {response.text}")
        data = response.json()
        if "total" not in data:
            raise Exception("Campo 'total' não encontrado na resposta da Twitch.")
        return data["total"] > 0

async def verificar_se_segue_twitch(access_token: str, client_id: str):
    try:
        user_id = await get_user_id(access_token, client_id)
        segue_furia = await check_if_follows(access_token, client_id, user_id)
        if segue_furia:
            print("O usuário segue o canal FURIA!")
        else:
            print("O usuário NÃO segue o canal FURIA.")
    except Exception as e:
        print(f"Ocorreu um erro: {e}")
