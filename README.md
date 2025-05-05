# 🦁 Projeto FURIA - Know Your Fan

Este projeto foi desenvolvido como parte do **Challenge #2 - Know Your Fan** do processo seletivo da **FURIA Esports**. O objetivo é criar uma aplicação interativa para coletar e analisar informações sobre os fãs da organização, com perguntas dinâmicas e exibição de resultados por gráficos.

🎯 **Objetivo**: Criar uma solução que permita coletar dados sobre o perfil dos fãs, apresentar perguntas personalizadas, e fornecer resultados em gráficos para entender melhor o engajamento com a FURIA e o cenário de esports.

---

## 🚀 Tecnologias Utilizadas

- **React.js**: Biblioteca JavaScript para construir interfaces de usuário.
- **Framer Motion**: Biblioteca de animações para React, usada para transições e efeitos visuais.
- **CSS3**: Para o estilo e design da aplicação.
- **FastAPI**: Backend utilizado para processar e validar dados, incluindo a autenticação e recomendações baseadas em IA.
- **Azure Form Recognizer**: Para validação de documentos com inteligência artificial.
- **OpenAI API**: Para gerar recomendações personalizadas com base nas escolhas dos usuários.

---

## 📦 Instalação e Execução

### 1. Clone o Repositório

Clone o repositório para sua máquina local:

```bash
git clone https://github.com/SEU_USUARIO/Projeto-FURIA.git
cd .\Projeto-FURIA\
```

### 2. Instale as Dependências
Instale as dependências utilizando o npm:

```bash
npm install
npm install framer-motion
```

### 3. Configuração do Backend

``` bash
cd .\backend\
pip install -r requirements.txt
```

### 4. Configure as variáveis de ambiente criando um arquivo .env na raiz do projeto (pasta backend) com as chaves necessárias (exemplo para Azure e OpenAI):

``` bash
AZURE_FORM_RECOGNIZER_KEY=your_azure_key
AZURE_FORM_RECOGNIZER_ENDPOINT=your_azure_endpoint
OPENAI_API_KEY=your_openai_api_key

```

### 5. Inicie o servidor backend (deve ser feito em um terminal diferente da aplicação fron-end - npm start mais para frente):
``` bash
cd .\backend\
uvicorn app.main:app --reload
Isso fará a API rodar localmente em http://localhost:8000.
```

### 6. Execute a Aplicação
Após configurar o backend, você pode rodar a aplicação frontend com o comando:

``` bash
npm start
A aplicação estará disponível em http://localhost:3000.
```

📈 Funcionalidades
Quiz Interativo: O usuário responde perguntas sobre sua experiência com esports, incluindo jogos de interesse e hábitos de consumo.

Recomendações Personalizadas: Com base nas escolhas feitas no quiz, a IA do backend gera recomendações de influenciadores e jogadores da FURIA.

Upload e Validação de Documentos: O sistema permite que o usuário faça upload de documentos, como identidade ou comprovante de residência, e utilize IA para validá-los.
