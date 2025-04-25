import {
    APIGatewayProxyEvent,
    Context,
    APIGatewayProxyResult,
} from 'aws-lambda';
import { getTasks } from '../../services/tasks';

export const handler = async (
    event: APIGatewayProxyEvent,
    context: Context
): Promise<APIGatewayProxyResult> => {
    try {
        const tasks = await getTasks();
        return {
            statusCode: 200,
            body: JSON.stringify(tasks),
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify(err),
        };
    }
};