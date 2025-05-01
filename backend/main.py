from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
import shutil
import os
from datetime import datetime

app = FastAPI()

# Configuração do CORS para permitir requisições do frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Altere se seu frontend estiver em outro domínio
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def salvar_arquivo(upload_file: UploadFile, destino: str) -> str:
    """
    Salva o arquivo no caminho especificado e retorna o caminho salvo.
    """
    with open(destino, "wb") as buffer:
        shutil.copyfileobj(upload_file.file, buffer)
    return destino

@app.post("/upload/")
async def upload_document(
    tipo_documento: str = Form(...),
    frente: UploadFile = File(...),
    verso: Optional[UploadFile] = File(None)
):
    # Cria diretório de uploads, se não existir
    pasta_uploads = "uploads"
    os.makedirs(pasta_uploads, exist_ok=True)

    # Define nomes únicos para os arquivos para evitar conflitos
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    frente_filename = f"{timestamp}_frente_{frente.filename}"
    frente_path = os.path.join(pasta_uploads, frente_filename)
    salvar_arquivo(frente, frente_path)

    if verso:
        verso_filename = f"{timestamp}_verso_{verso.filename}"
        verso_path = os.path.join(pasta_uploads, verso_filename)
        salvar_arquivo(verso, verso_path)
    else:
        verso_path = None

    return {
        "mensagem": "Upload realizado com sucesso",
        "tipo_documento": tipo_documento,
        "frente": frente_path,
        "verso": verso_path
    }
