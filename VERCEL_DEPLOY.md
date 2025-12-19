# Quiz Garagem - Deploy no Vercel

## Passo a Passo

### 1. Faça Push para o GitHub
```bash
git add .
git commit -m "Setup Vercel deployment"
git push origin main
```

### 2. Configure o Vercel

1. Acesse [vercel.com](https://vercel.com) e faça login
2. Clique em **"Add New Project"**
3. Importe o repositório do GitHub
4. Clique em **"Deploy"**

### 3. Configure o Vercel KV (Banco de Dados)

1. Após o deploy, vá para o **Dashboard do Projeto** no Vercel
2. Clique na aba **"Storage"**
3. Clique em **"Create Database"**
4. Selecione **"KV"** (Redis)
5. Dê um nome (ex: `quiz-garagem-db`)
6. Clique em **"Create"**
7. O Vercel conectará automaticamente as variáveis de ambiente

### 4. Redeploy

Após criar o banco KV, faça um redeploy:
1. Vá em **"Deployments"**
2. Clique nos 3 pontos do último deploy
3. Clique em **"Redeploy"**

## URLs

Após o deploy:
- **Quiz**: `https://seu-projeto.vercel.app/`
- **Admin**: `https://seu-projeto.vercel.app/respostas/`

## Importante

- O **Vercel KV** é gratuito até 256MB
- Todas as respostas ficam salvas centralmente
- O painel `/respostas/` mostra TODAS as respostas de TODOS os usuários
- O webhook do Garagem continua recebendo os dados também
