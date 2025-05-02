from fastapi import APIRouter, Request
from urllib.parse import urlencode
import requests

router = APIRouter()

CLIENT_ID = "SEU_CLIENT_ID"
CLIENT_SECRET = "SEU_CLIENT_SECRET"
REDIRECT_URI = "http://localhost:3000/auth/twitch/callback"

@router.get("/auth/twitch")
def redirect_to_twitch():
    base_url = "https://id.twitch.tv/oauth2/authorize"
    params = {
        "client_id": CLIENT_ID,
        "redirect_uri": REDIRECT_URI,
        "response_type": "code",
        "scope": "user:read:follows",
    }
    return {"redirect_url": f"{base_url}?{urlencode(params)}"}

@router.get("/auth/twitch/callback")
def twitch_callback(request: Request):
    code = request.query_params.get("code")
    token_url = "https://id.twitch.tv/oauth2/token"
    data = {
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "code": code,
        "grant_type": "authorization_code",
        "redirect_uri": REDIRECT_URI,
    }

    response = requests.post(token_url, data=data)
    token_data = response.json()
    access_token = token_data.get("access_token")

    return {"access_token": access_token}
