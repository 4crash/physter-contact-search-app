import cors from 'cors';
import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

interface Contact {
    ItemGUID: string;
    FileAs?: string;
    FirstName?: string;
    LastName?: string;
    Email1Address?: string;
    TelephoneNumber1?: string;
    LastActivity?: string;
    Company?: string;
    Department?: string;
    ProfilePicture?: string;
    BusinessAddressStreet?: string;
    BusinessAddressCity?: string;

    BusinessAddressState?: string;
    BusinessAddressPostalCode?: string;
    HomeAddressStreet?: string;
    HomeAddressCity?: string;
    HomeAddressState?: string;
    HomeAddressPostalCode?: string;
}

const DATA_PATH = path.join(__dirname, 'data', 'contacts.json');

const getContacts = (): Contact[] => {
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

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
