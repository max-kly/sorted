import { APIGatewayProxyEvent } from "aws-lambda";
export const createUpdateQuery = (table: string, updates: Record<string, any>, id: string) => {
    if (
        typeof table !== 'string' ||
        typeof updates !== 'object' ||
        updates === null ||
        Array.isArray(updates) ||
        typeof id !== 'string'
    ) {
        throw new Error(
            'Required data is missing: Function expects 3 arguments: table name (string), fields and new values (object), id (string)'
        );
    }
    const fields: string[] = Object.keys(updates);
    const values = fields.map(field => updates[field])
    values.push(id)
    const clause = `UPDATE ${table} SET${fields.map((field, index: number) => {
        return ` ${field} = $${index + 1}`;
    })} WHERE id = $${values.length} RETURNING *`
    return { clause, values };
};
export const generateMockEvent = (
    overrides: Partial<APIGatewayProxyEvent> = {}
): APIGatewayProxyEvent => ({
    body: null,
    headers: {},
    multiValueHeaders: {},
    httpMethod: 'GET',
    isBase64Encoded: false,
    path: '/',
    pathParameters: null,
    queryStringParameters: null,
    multiValueQueryStringParameters: null,
    stageVariables: null,
    requestContext: {} as any,
    resource: '',
    ...overrides
});