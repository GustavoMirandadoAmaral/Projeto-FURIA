import os
import openai
from fastapi import APIRouter, Request
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

# Configuração da API padrão da OpenAI
openai.api_key = os.getenv("OPENAI_API_KEY")

@router.post("/recomendar")
async def recomendar(request: Request):
    body = await request.json()
    jogos = body.get("jogos", [])

    if not jogos:
        return {"recomendacoes": "Nenhum jogo foi selecionado."}

    prompt = f"Recomende 3 streamers, jogadores ou influenciadores da FURIA relacionados aos jogos: {', '.join(jogos)}. Para cada um, diga o nome, tipo (streamer, jogador, etc) e o jogo relacionado."

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": prompt}
            ]
        )

        content = response["choices"][0]["message"]["content"]

        # Divide em linhas e retorna como lista
        recomendacoes = []
        for line in content.strip().split("\n"):
            if line.strip():
                recomendacoes.append({"nome": line.strip(), "tipo": "Desconhecido", "jogo": "Desconhecido"})

        # Limita as recomendações a 3
        recomendacoes = recomendacoes[:3]

        return {"recomendacoes": recomendacoes}

    except Exception as e:
        return {"recomendacoes": f"Erro na geração com OpenAI: {str(e)}"}
