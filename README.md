# Quiz Garagem

Quiz de Lógica para processo seletivo da Garagem.

## 🚀 Deploy no Vercel (Recomendado)

Este projeto está configurado para rodar no **Vercel** com **Vercel KV** (Redis) como banco de dados.

**Instruções completas**: Veja [VERCEL_DEPLOY.md](./VERCEL_DEPLOY.md)

## 💻 Desenvolvimento Local (Opcional)

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Inicie o servidor:**
   ```bash
   npm run dev
   ```

3. **Acesse:**
   - Quiz: http://localhost:3000/index.html
   - Admin: http://localhost:3000/respostas/index.html

> **Nota**: No desenvolvimento local, o servidor usa `data/leads.json` como banco. No Vercel, usa Vercel KV.

## 📁 Estrutura

- `/index.html` - Quiz principal
- `/respostas/index.html` - Painel administrativo
- `/api/leads.js` - Vercel Serverless Function
- `/script.js` - Lógica do quiz
- `/style.css` - Estilos

## ✨ Funcionalidades

- 15 perguntas (10 múltipla escolha + 5 dissertativas)
- Sistema de pontuação
- Painel administrativo com todas as respostas
- Envio para webhook do Garagem
- Easter egg no console 🐰
