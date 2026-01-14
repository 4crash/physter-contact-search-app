import request from 'supertest';
import app from '../index.js';

describe('Server API', () => {
    describe('GET /contacts/search', () => {
        it('should return a contact when a valid email is provided', async () => {
            const response = await request(app)
                .get('/contacts/search')
                .query({ email: 'john.doe@example.com' });

            expect(response.status).toBe(200);
            expect(response.body.Status).toBe('OK');
            expect(response.body.Data).toHaveLength(1);
            expect(response.body.Data[0].Email1Address).toBe('john.doe@example.com');
            expect(response.body.Data[0].FileAs).toBe('John Doe');
        });

        it('should return an empty data array when email is not found', async () => {
            const response = await request(app)
                .get('/contacts/search')
                .query({ email: 'nonexistent@example.com' });

            expect(response.status).toBe(200);
            expect(response.body.Status).toBe('OK');
            expect(response.body.Data).toHaveLength(0);
        });

        it('should return 400 when email parameter is missing', async () => {
            const response = await request(app).get('/contacts/search');

            expect(response.status).toBe(400);
            expect(response.body.status).toBe('error');
            expect(response.body.message).toBe('Email parameter is required');
        });

        it('should be case-insensitive for email search', async () => {
            const response = await request(app)
                .get('/contacts/search')
                .query({ email: 'JOHN.DOE@EXAMPLE.COM' });

            expect(response.status).toBe(200);
            expect(response.body.Data).toHaveLength(1);
            expect(response.body.Data[0].Email1Address).toBe('john.doe@example.com');
        });
    });

    describe('GET /contacts/:guid', () => {
        it('should return a contact for a valid GUID', async () => {
            const guid = 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d';
            const response = await request(app).get(`/contacts/${guid}`);

            expect(response.status).toBe(200);
            expect(response.body.Status).toBe('OK');
            expect(response.body.Data).toHaveLength(1);
            expect(response.body.Data[0].ItemGUID).toBe(guid);
        });

        it('should return 404 for a non-existent GUID', async () => {
            const response = await request(app).get('/contacts/non-existent-guid');

            expect(response.status).toBe(404);
            expect(response.body.status).toBe('error');
            expect(response.body.message).toBe('Contact not found');
        });
    });
});
