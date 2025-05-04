from fastapi import APIRouter, File, UploadFile
from app.azure_validator import validar_documento_azure
import os
import shutil
from uuid import uuid4

router = APIRouter()

UPLOAD_FOLDER = "temp_uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@router.post("/upload/")
async def upload_documento(verso: UploadFile = File(...)):
    try:
        ext = verso.filename.split('.')[-1]
        caminho_verso = os.path.join(UPLOAD_FOLDER, f"{uuid4()}.{ext}")
        with open(caminho_verso, "wb") as buffer:
            shutil.copyfileobj(verso.file, buffer)

        resultado_verso = validar_documento_azure(caminho_verso)

        os.remove(caminho_verso)

        return resultado_verso

    except Exception as e:
        return {"erro": f"Erro ao processar o upload: {str(e)}"}
    

#curl -X DELETE http://localhost:8000/reset-docs
#mandar para apagar o banco de dados com os arquivos (só para testar o envio e validação por IA)
@router.delete("/reset-docs")
def reset_documentos():
    pasta_uploads = "uploads"  
    arquivos = os.listdir(pasta_uploads)
    for arquivo in arquivos:
        caminho = os.path.join(pasta_uploads, arquivo)
        os.remove(caminho)
        return {"message": "Arquivos deletados com sucesso!"}
