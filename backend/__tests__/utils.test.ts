import { APIGatewayProxyEvent } from 'aws-lambda';
import { createUpdateQuery, generateMockEvent } from '../src/lib/utils'
describe('Util createUpdateQuery() tests:', () => {
    test(`Returns an error message for missing data`, () => {
        const fields = {
            name: 'Max Kly'
        }
        const msg = 'Required data is missing: Function expects 3 arguments: table name (string), fields and new values (object), id (string)'
        // @ts-expect-error: Testing invalid arguments
        expect(() => createUpdateQuery('users', fields)).toThrow(msg)
        // @ts-expect-error: Testing invalid arguments
        expect(() => createUpdateQuery('users', '1')).toThrow(msg)
        // @ts-expect-error: Testing invalid arguments
        expect(() => createUpdateQuery(fields, '1')).toThrow(msg)
    })
    test('Returns an object with valid update clause and values for user from passed object with a single field', () => {
        const fields = {
            name: 'Max Kly'
        }
        expect(createUpdateQuery('users', fields, '1')).toEqual({
            clause: 'UPDATE users SET name = $1 WHERE id = $2 RETURNING *',
            values: ['Max Kly', '1']
        })
    })
    test('Returns an object with valid update clause and values for task from passed object with multiple fields', () => {
        const fields = {
            title: 'Create util tests',
            description: 'Set up file and tests for createUpdateQuery function',
            deadline: 'ASAP'
        }
        expect(createUpdateQuery('tasks', fields, '12')).toEqual({
            clause: 'UPDATE tasks SET title = $1, description = $2, deadline = $3 WHERE id = $4 RETURNING *',
            values: ['Create util tests', 'Set up file and tests for createUpdateQuery function', 'ASAP', '12']
        })
    })
})
describe('Util generateMockEvent() tests:', () => {
    let event: APIGatewayProxyEvent;
    test('Returns an object of type APIGatewayProxyEvent', () => {
        const event = generateMockEvent()
        expect(event).toBeDefined();
        expect(typeof event).toBe('object');
    });
    test('Returns an object with APIGatewayProxyEvent interface', () => {
        const event = generateMockEvent()
        const requiredKeys: (keyof APIGatewayProxyEvent)[] = [
            'body',
            'headers',
            'multiValueHeaders',
            'httpMethod',
            'isBase64Encoded',
            'path',
            'pathParameters',
            'queryStringParameters',
            'multiValueQueryStringParameters',
            'stageVariables',
            'requestContext',
            'resource',
        ];
        requiredKeys.forEach((key) => {
            expect(event).toHaveProperty(key);
        });
    });
    test('Returns an object with updated keys when custom keys were passed', () => {
        const event = generateMockEvent({ httpMethod: 'POST', body: '{list_id: 1, title: "Test"}', path: '/lists' })
        const expectedOutput = {
            body: '{list_id: 1, title: "Test"}',
            headers: {},
            multiValueHeaders: {},
            httpMethod: 'POST',
            isBase64Encoded: false,
            path: '/lists',
            pathParameters: null,
            queryStringParameters: null,
            multiValueQueryStringParameters: null,
            stageVariables: null,
            requestContext: {} as any,
            resource: '',
        }
        expect(event).toEqual(expectedOutput)
    })
});