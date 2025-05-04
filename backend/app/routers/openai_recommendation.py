import os
import openai
from fastapi import APIRouter, Request
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

openai.api_type = "azure"
openai.api_base = os.getenv("AZURE_OPENAI_ENDPOINT")
openai.api_key = os.getenv("AZURE_OPENAI_KEY")
openai.api_version = os.getenv("AZURE_OPENAI_VERSION")
deployment_id = os.getenv("AZURE_OPENAI_DEPLOYMENT")

@router.post("/recomendar")
async def recomendar(request: Request):
    body = await request.json()
    jogos = body.get("jogos", [])

    if not jogos:
        return {"recomendacoes": "Nenhum jogo foi selecionado."}

    prompt = f"Recomende 3 streamers, jogadores ou influenciadores da FURIA relacionados aos jogos: {', '.join(jogos)}. Para cada um, diga o nome, tipo (streamer, jogador, etc) e o jogo relacionado."

    try:
        response = openai.ChatCompletion.create(
            engine=deployment_id,
            messages=[
                {"role": "user", "content": prompt}
            ]
        )

        content = response["choices"][0]["message"]["content"]

        # Retorna como lista simples separando por linhas
        recomendacoes = []
        for line in content.strip().split("\n"):
            if line.strip():
                recomendacoes.append({"nome": line.strip(), "tipo": "Desconhecido", "jogo": "Desconhecido"})

        return {"recomendacoes": recomendacoes}

    except Exception as e:
        return {"recomendacoes": f"Erro na geração com Azure OpenAI: {str(e)}"}
