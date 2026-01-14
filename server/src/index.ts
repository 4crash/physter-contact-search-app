import cors from 'cors';
import type { Request, Response } from 'express';
import express from 'express';
import fs from 'fs';
import path from 'path';
import type { PhysterContact } from '../types/contact.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const DATA_PATH = path.join(__dirname, 'data', 'contacts.json');

const getContacts = (): PhysterContact[] => {
    try {
        const data = fs.readFileSync(DATA_PATH, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading contacts data:', error);
        return [];
    }
};

// Search contacts by email
app.get('/contacts/search', (req: Request, res: Response) => {
    const email = req.query.email as string;

    if (!email) {
        return res.status(400).json({ status: 'error', message: 'Email parameter is required' });
    }

    const contacts = getContacts();
    const contact = contacts.find(c => c.Email1Address?.toLowerCase() === email.toLowerCase());

    if (contact) {
        res.json({
            Status: 'OK',
            Data: [contact]
        });
    } else {
        res.json({
            Status: 'OK',
            Data: []
        });
    }
});

// Get contact by GUID
app.get('/contacts/:guid', (req: Request, res: Response) => {
    const { guid } = req.params;
    const contacts = getContacts();
    const contact = contacts.find(c => c.ItemGUID === guid);

    if (contact) {
        res.json({
            Status: 'OK',
            Data: [contact]
        });
    } else {
        res.status(404).json({ status: 'error', message: 'Contact not found' });
    }
});

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

export default app;
