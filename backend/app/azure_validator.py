from azure.ai.formrecognizer import DocumentAnalysisClient
from azure.core.credentials import AzureKeyCredential

# Endereço e chave da conta do Azure
AZURE_ENDPOINT = "https://furia-form.cognitiveservices.azure.com/"
AZURE_KEY = "EYELZ9kTaYBLIXkVE8DfiQgz5byHqpJZ333cnXZoY6GYVkmC8tULJQQJ99BEACYeBjFXJ3w3AAALACOGNmTk"

# Cria o cliente do Azure Form Recognizer
document_client = DocumentAnalysisClient(
    endpoint=AZURE_ENDPOINT,
    credential=AzureKeyCredential(AZURE_KEY)
)

# Mapeia os tipos de documentos retornados pelo Azure para valores legíveis
DOCUMENT_TYPES = {
    "passport": "passaporte",
    "idCard": "identidade",
    "driverLicense": "cnh"
}

def validar_documento_azure(caminho_arquivo: str):
    try:
        # Abre o arquivo PDF ou imagem
        with open(caminho_arquivo, "rb") as f:
            file_bytes = f.read()

        # Verifica o tamanho do arquivo para garantir que ele foi lido corretamente
        if not file_bytes:
            return {"erro": "O arquivo está vazio. Por favor, envie um arquivo válido."}

        # Chama a API do Azure para análise do documento
        poller = document_client.begin_analyze_document(
            model_id="prebuilt-idDocument",  # Modelo predefinido para documentos de identidade
            document=file_bytes,
        )

        result = poller.result()  # Obtém o resultado da análise

        if not result.documents:
            return {"erro": "Falha na detecção do documento. Tente novamente."}

        # Exibe o resultado para depuração
        print("Resultado da API:", result)

        # Obtém o primeiro documento detectado
        doc_detectado = result.documents[0]

        # Verifica se o documento é o verso, que geralmente possui uma chave "Back"
        if not any(field for field in doc_detectado.fields if field.lower() == 'back'):
            return {"erro": "Documento não identificado como verso. Tente novamente."}

        # Extração de dados do verso do documento
        dados_extraidos = {}
        for campo, field in doc_detectado.fields.items():
            valor = field.value
            if valor:
                dados_extraidos[campo] = valor

        # Formatação dos dados extraídos em um formato mais legível e padronizado
        retorno_padronizado = {
            "tipo_documento": "verso",  # Tipo de documento detectado como verso
            "nome": f"{dados_extraidos.get('FirstName', '')} {dados_extraidos.get('LastName', '')}".strip(),
            "cpf": dados_extraidos.get("DocumentNumber", ""),
            "data_nascimento": dados_extraidos.get("DateOfBirth", ""),
            "nacionalidade": dados_extraidos.get("Nationality", ""),
            "sexo": dados_extraidos.get("Sex", ""),
            "data_validade": dados_extraidos.get("DateOfExpiration", "")
        }

        # Retorna os dados extraídos para o frontend
        return retorno_padronizado

    except Exception as e:
        # Caso ocorra algum erro, retorna uma mensagem com o erro
        return {"erro": f"Ocorreu um erro ao processar o documento: {str(e)}"}
