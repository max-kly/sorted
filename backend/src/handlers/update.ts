import { APIGatewayProxyEvent, Context, APIGatewayProxyResult } from 'aws-lambda';
import { updateTask } from '../services/tasks';

export const handler = async (
    event: APIGatewayProxyEvent,
    context: Context
): Promise<APIGatewayProxyResult> => {
    const { id } = event.pathParameters || {};
    if (!id) return { statusCode: 400, body: 'Task ID is required' };
    const updates = JSON.parse(event.body!);
    const updatedTask = await updateTask(id, updates);
    return {
        statusCode: 200,
        body: JSON.stringify(updatedTask),
    };
};