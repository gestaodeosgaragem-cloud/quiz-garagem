import { kv } from '@vercel/kv';

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method === 'POST') {
        try {
            const lead = req.body;
            const timestamp = Date.now();
            const key = `lead:${timestamp}`;

            // Store in Vercel KV
            await kv.set(key, JSON.stringify(lead));

            return res.status(200).json({ success: true, id: key });
        } catch (error) {
            console.error('Error saving lead:', error);
            return res.status(500).json({ error: 'Failed to save lead', details: error.message });
        }
    }

    if (req.method === 'GET') {
        try {
            // Get all keys matching pattern
            const keys = await kv.keys('lead:*');
            const leads = [];

            // Fetch all leads
            for (const key of keys) {
                const data = await kv.get(key);
                if (data) {
                    const parsed = typeof data === 'string' ? JSON.parse(data) : data;
                    leads.push(parsed);
                }
            }

            // Sort by timestamp (newest first)
            leads.sort((a, b) => new Date(b.data_preenchimento) - new Date(a.data_preenchimento));

            return res.status(200).json(leads);
        } catch (error) {
            console.error('Error fetching leads:', error);
            return res.status(500).json({ error: 'Failed to fetch leads', details: error.message });
        }
    }

    return res.status(405).json({ error: 'Method not allowed' });
}
