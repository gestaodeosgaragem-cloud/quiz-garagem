# Quiz Garagem - Instruções de Deploy

## Pré-requisitos no Vercel

Este projeto usa **Vercel KV** (Redis) para armazenar as respostas de forma centralizada.

### Passos para Deploy:

1. **Faça push do código para o GitHub**
   ```bash
   git add .
   git commit -m "Implementa persistência com Vercel KV"
   git push origin main
   ```

2. **Importe o projeto no Vercel**
   - Acesse [vercel.com](https://vercel.com)
   - Clique em "Add New Project"
   - Importe o repositório do GitHub

3. **Configure o Vercel KV**
   - No dashboard do projeto no Vercel, vá em **Storage**
   - Clique em **Create Database**
   - Selecione **KV (Redis)**
   - Dê um nome (ex: `quiz-garagem-db`)
   - Clique em **Create**
   - O Vercel automaticamente conectará as variáveis de ambiente

4. **Deploy**
   - O Vercel fará o deploy automaticamente
   - Acesse o quiz em: `https://seu-projeto.vercel.app`
   - Acesse o admin em: `https://seu-projeto.vercel.app/respostas/`

## Funcionamento

- Todas as respostas são salvas no **Vercel KV** (banco Redis)
- O painel `/respostas/` mostra **TODAS** as respostas de **TODOS** os usuários
- O webhook do Garagem continua recebendo os dados também

## Desenvolvimento Local

Para testar localmente, você precisaria configurar as variáveis de ambiente do Vercel KV localmente, mas é mais fácil testar direto no Vercel após o deploy.
