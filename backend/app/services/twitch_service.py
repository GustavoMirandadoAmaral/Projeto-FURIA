import requests

def get_user_id(access_token: str, client_id: str):
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Client-Id": client_id,
    }
    response = requests.get("https://api.twitch.tv/helix/users", headers=headers)
    data = response.json()
    return data["data"][0]["id"]

def check_if_follows(access_token: str, client_id: str, user_id: str, furia_channel_id: str = "587620441"):
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Client-Id": client_id,
    }
    url = f"https://api.twitch.tv/helix/users/follows?from_id={user_id}&to_id={furia_channel_id}"
    response = requests.get(url, headers=headers)
    data = response.json()
    return data["total"] > 0
