from azure.ai.formrecognizer import DocumentAnalysisClient
from azure.core.credentials import AzureKeyCredential

AZURE_ENDPOINT = "https://furia-form.cognitiveservices.azure.com/"
AZURE_KEY = "EYELZ9kTaYBLIXkVE8DfiQgz5byHqpJZ333cnXZoY6GYVkmC8tULJQQJ99BEACYeBjFXJ3w3AAALACOGNmTk"

document_client = DocumentAnalysisClient(
    endpoint=AZURE_ENDPOINT,
    credential=AzureKeyCredential(AZURE_KEY)
)

def validar_documento_azure(caminho_arquivo: str):
    with open(caminho_arquivo, "rb") as f:
        file_bytes = f.read()

    content_type = (
        "application/pdf" if caminho_arquivo.endswith(".pdf") else "image/jpeg"
    )

    poller = document_client.begin_analyze_document(
        model_id="prebuilt-idDocument",
        document=file_bytes,
        content_type=content_type,
    )

    result = poller.result()

    if not result.documents:
        return {"erro": "Nenhum documento válido encontrado."}

    dados_extraidos = {}
    for doc in result.documents:
        for campo, field in doc.fields.items():
            valor = field.value
            if valor:
                dados_extraidos[campo] = valor

    retorno_padronizado = {
        "nome": f"{dados_extraidos.get('FirstName', '')} {dados_extraidos.get('LastName', '')}".strip(),
        "cpf": dados_extraidos.get("DocumentNumber", ""),
        "data_nascimento": dados_extraidos.get("DateOfBirth", ""),
        "nacionalidade": dados_extraidos.get("Nationality", ""),
        "sexo": dados_extraidos.get("Sex", ""),
        "data_validade": dados_extraidos.get("DateOfExpiration", "")
    }

    return retorno_padronizado
