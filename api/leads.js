const { kv } = require('@vercel/kv');

module.exports = async (req, res) => {
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

            await kv.set(key, JSON.stringify(lead));

            return res.status(200).json({ success: true, id: key });
        } catch (error) {
            console.error('Error saving lead:', error);
            return res.status(500).json({ error: 'Failed to save lead' });
        }
    }

    if (req.method === 'GET') {
        try {
            const keys = await kv.keys('lead:*');
            const leads = [];

            for (const key of keys) {
                const data = await kv.get(key);
                if (data) {
                    leads.push(typeof data === 'string' ? JSON.parse(data) : data);
                }
            }

            return res.status(200).json(leads);
        } catch (error) {
            console.error('Error fetching leads:', error);
            return res.status(500).json({ error: 'Failed to fetch leads' });
        }
    }

    return res.status(405).json({ error: 'Method not allowed' });
};
