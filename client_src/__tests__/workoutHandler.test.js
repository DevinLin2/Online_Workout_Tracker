import { createMocks } from 'node-mocks-http';
import handler from '../pages/api/workoutHandler';

describe('workoutHandler test', () => {
    test('GET method test', async () => {
        const { req, res } = createMocks({
            method: 'GET',
        });
        await handler(req, res);
        expect(res._getStatusCode()).toBe(200);
        expect(JSON.parse(res._getData())).toEqual(
            expect.objectContaining({
                message: 'workout sent'
            }),
        );
    });
    test('POST method test', async () => {
        const { req, res } = createMocks({
            method: 'POST',
            body: JSON.stringify({title: "", date: "", exercises: []}),
        });
        await handler(req, res);
        expect(res._getStatusCode()).toBe(200);
        expect(JSON.parse(res._getData())).toEqual(
            expect.objectContaining({
                message: 'workout created'
            }),
        );
    });
    test('Incorrect request method', async () => {
        const { req, res } = createMocks({
            method: 'HELLO',
        });
        await handler(req, res);
        expect(res._getStatusCode()).toBe(405);
    });
});