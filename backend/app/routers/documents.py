from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from fastapi.responses import JSONResponse
import os

from app.azure_validator import validar_documento_azure

router = APIRouter(prefix="/upload", tags=["Documentos"])

@router.post("/")
async def upload_documentos(
    tipoDocumento: str = Form(...),
    frente: UploadFile = File(...),
    verso: UploadFile = File(None)
):
    try:
        os.makedirs("uploads", exist_ok=True)

        # --- Salvar frente ---
        caminho_frente = f"uploads/{frente.filename}"
        frente_content = await frente.read()
        with open(caminho_frente, "wb") as f:
            f.write(frente_content)

        # --- Validar frente ---
        resultado_frente = validar_documento_azure(caminho_arquivo=caminho_frente)

        # --- Verificação imediata ---
        if "erro" in resultado_frente:
            os.remove(caminho_frente)
            raise HTTPException(status_code=400, detail=resultado_frente["erro"])

        # --- Salvar verso (se houver) ---
        resultado_verso = None
        caminho_verso = None

        if verso:
            caminho_verso = f"uploads/{verso.filename}"
            verso_content = await verso.read()
            with open(caminho_verso, "wb") as f:
                f.write(verso_content)

            try:
                resultado_verso = validar_documento_azure(caminho_arquivo=caminho_verso)
            except Exception as e:
                resultado_verso = {"erro": f"Erro ao processar o verso: {str(e)}"}

        # --- Limpeza dos arquivos ---
        os.remove(caminho_frente)
        if caminho_verso and os.path.exists(caminho_verso):
            os.remove(caminho_verso)

        return JSONResponse(content={
            "mensagem": "Documentos enviados com sucesso",
            "tipoDocumento": tipoDocumento,
            "resultado_frente": resultado_frente,
            "resultado_verso": resultado_verso
        }, status_code=200)

    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao processar os documentos: {str(e)}")
