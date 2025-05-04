from azure.ai.formrecognizer import DocumentAnalysisClient
from azure.core.credentials import AzureKeyCredential

AZURE_ENDPOINT = "https://furia-form.cognitiveservices.azure.com/"
AZURE_KEY = "EYELZ9kTaYBLIXkVE8DfiQgz5byHqpJZ333cnXZoY6GYVkmC8tULJQQJ99BEACYeBjFXJ3w3AAALACOGNmTk"

document_client = DocumentAnalysisClient(
    endpoint=AZURE_ENDPOINT,
    credential=AzureKeyCredential(AZURE_KEY)
)

DOCUMENT_TYPES = {
    "passport": "passaporte",
    "idCard": "identidade",
    "driverLicense": "cnh"
}

def validar_documento_azure(caminho_arquivo: str):
    try:
        with open(caminho_arquivo, "rb") as f:
            file_bytes = f.read()


        if not file_bytes:
            return {"erro": "O arquivo está vazio. Por favor, envie um arquivo válido."}

        poller = document_client.begin_analyze_document(
            model_id="prebuilt-idDocument",  
            document=file_bytes,
        )

        result = poller.result()  

        if not result.documents:
            return {"erro": "Falha na detecção do documento. Tente novamente."}
        
        print("Resultado da API:", result)

        doc_detectado = result.documents[0]

        if not any(field for field in doc_detectado.fields if field.lower() == 'back'):
            return {"erro": "Documento não identificado como verso. Tente novamente."}

        dados_extraidos = {}
        for campo, field in doc_detectado.fields.items():
            valor = field.value
            if valor:
                dados_extraidos[campo] = valor

        retorno_padronizado = {
            "tipo_documento": "verso",  
            "nome": f"{dados_extraidos.get('FirstName', '')} {dados_extraidos.get('LastName', '')}".strip(),
            "cpf": dados_extraidos.get("DocumentNumber", ""),
            "data_nascimento": dados_extraidos.get("DateOfBirth", ""),
            "nacionalidade": dados_extraidos.get("Nationality", ""),
            "sexo": dados_extraidos.get("Sex", ""),
            "data_validade": dados_extraidos.get("DateOfExpiration", "")
        }

        return retorno_padronizado

    except Exception as e:
        return {"erro": f"Ocorreu um erro ao processar o documento: {str(e)}"}
