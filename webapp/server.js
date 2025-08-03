const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;
const FUSEKI_URL = process.env.FUSEKI_URL || 'http://localhost:3030/ds';

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/api/upload-owl', async (req, res) => {
    try {
        const { owlData } = req.body;
        const auth = Buffer.from('admin:admin123').toString('base64');
        
        const response = await axios.put(
            `${FUSEKI_URL}/data?default`,
            owlData,
            {
                headers: {
                    'Content-Type': 'application/rdf+xml',
                    'Authorization': `Basic ${auth}`
                }
            }
        );
        
        res.json({ success: true, message: 'OWL data uploaded successfully' });
    } catch (error) {
        console.error('Error uploading OWL data:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/api/query', async (req, res) => {
    try {
        const { query } = req.body;
        const auth = Buffer.from('admin:admin123').toString('base64');
        
        const response = await axios.post(
            `${FUSEKI_URL}/query`,
            `query=${encodeURIComponent(query)}`,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/sparql-results+json',
                    'Authorization': `Basic ${auth}`
                }
            }
        );
        
        res.json(response.data);
    } catch (error) {
        console.error('Error executing SPARQL query:', error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/reasoning-query', async (req, res) => {
    try {
        const { query } = req.body;
        const auth = Buffer.from('admin:admin123').toString('base64');
        
        const response = await axios.post(
            `${FUSEKI_URL}/query`,
            `query=${encodeURIComponent(query)}`,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/sparql-results+json',
                    'Authorization': `Basic ${auth}`
                }
            }
        );
        
        res.json(response.data);
    } catch (error) {
        console.error('Error executing reasoning query:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Fuseki endpoint: ${FUSEKI_URL}`);
});