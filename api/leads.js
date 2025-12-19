import fs from 'fs';
import path from 'path';

const DATA_FILE = '/tmp/leads.json';

// Ensure file exists
function ensureFile() {
    if (!fs.existsSync(DATA_FILE)) {
        fs.writeFileSync(DATA_FILE, '[]');
    }
}

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    ensureFile();

    if (req.method === 'POST') {
        try {
            const lead = req.body;
            const data = fs.readFileSync(DATA_FILE, 'utf8');
            const leads = JSON.parse(data || '[]');
            leads.push(lead);
            fs.writeFileSync(DATA_FILE, JSON.stringify(leads, null, 2));

            return res.status(200).json({ success: true });
        } catch (error) {
            console.error('Error saving lead:', error);
            return res.status(500).json({ error: 'Failed to save', details: error.message });
        }
    }

    if (req.method === 'GET') {
        try {
            const data = fs.readFileSync(DATA_FILE, 'utf8');
            const leads = JSON.parse(data || '[]');

            // Sort by timestamp (newest first)
            leads.sort((a, b) => new Date(b.data_preenchimento) - new Date(a.data_preenchimento));

            return res.status(200).json(leads);
        } catch (error) {
            console.error('Error fetching leads:', error);
            return res.status(200).json([]); // Return empty array if file doesn't exist yet
        }
    }

    return res.status(405).json({ error: 'Method not allowed' });
}
