from fastapi import APIRouter, File, UploadFile
from azure_validator import validar_documento_azure
import os
import shutil
from uuid import uuid4

router = APIRouter()

UPLOAD_FOLDER = "temp_uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@router.post("/upload/")
async def upload_documento(verso: UploadFile = File(...)):
    try:
        # Salva o arquivo do verso com nome único
        ext = verso.filename.split('.')[-1]
        caminho_verso = os.path.join(UPLOAD_FOLDER, f"{uuid4()}.{ext}")
        with open(caminho_verso, "wb") as buffer:
            shutil.copyfileobj(verso.file, buffer)

        # Valida com Azure
        resultado_verso = validar_documento_azure(caminho_verso)

        # Apaga o arquivo temporário
        os.remove(caminho_verso)

        # Retorna resultado direto
        return resultado_verso

    except Exception as e:
        return {"erro": f"Erro ao processar o upload: {str(e)}"}
