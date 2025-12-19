# Quiz Garagem

## Deploy no Vercel

1. Push para o GitHub
2. Importe no Vercel
3. Deploy automático
4. **PRONTO!** Não precisa configurar nada.

## Funcionamento

- `/api/leads.js` - Serverless function que salva em `/tmp/leads.json`
- Funciona automaticamente no Vercel
- Painel `/respostas/` mostra TODAS as respostas

> **Nota**: Os dados em `/tmp` são efêmeros (resetam a cada deploy), mas funcionam perfeitamente para demonstração. Para produção, use Vercel KV ou outro banco.
