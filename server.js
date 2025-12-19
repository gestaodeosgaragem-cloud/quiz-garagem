const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data', 'leads.json');

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

// Ensure leads.json exists
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, '[]');
}

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname)); // Serve static files from root

// Endpoint to get all leads
app.get('/api/leads', (req, res) => {
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading leads:', err);
            return res.status(500).json({ error: 'Erro ao ler banco de dados' });
        }
        res.json(JSON.parse(data || '[]'));
    });
});

// Endpoint to save a new lead
app.post('/api/leads', (req, res) => {
    const newLead = req.body;

    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        const leads = err ? [] : JSON.parse(data || '[]');
        leads.push(newLead);

        fs.writeFile(DATA_FILE, JSON.stringify(leads, null, 2), (err) => {
            if (err) {
                console.error('Error saving lead:', err);
                return res.status(500).json({ error: 'Erro ao salvar' });
            }
            res.json({ success: true });
        });
    });
});

app.listen(PORT, () => {
    console.log(`\n🚗 Server rodando em http://localhost:${PORT}`);
    console.log(`📝 Quiz: http://localhost:${PORT}/index.html`);
    console.log(`📊 Admin: http://localhost:${PORT}/respostas/index.html\n`);
});
