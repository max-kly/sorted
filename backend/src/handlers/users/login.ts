import {
    APIGatewayProxyEvent,
    Context,
    APIGatewayProxyResult,
} from 'aws-lambda';
import { login } from '../../services/users';

export const handler = async (
    event: APIGatewayProxyEvent,
    context: Context
): Promise<APIGatewayProxyResult> => {
    const { email, password } = event.queryStringParameters || {}
    if (!email || !password) return { statusCode: 400, body: 'Email and password are required' }
    const user = await login(email, password);
    if (user.statusCode) return { statusCode: user.statusCode, body: user.msg }
    return {
        statusCode: 200,
        body: JSON.stringify(user)
    };
};