import { APIGatewayProxyHandler } from 'aws-lambda';
import { updateTask } from '../../services/tasks';

export const handler: APIGatewayProxyHandler = async (event) => {
    const { id } = event.pathParameters!;
    const updates = JSON.parse(event.body!);
    const updatedTask = await updateTask(id, updates);
    return {
        statusCode: 200,
        body: JSON.stringify(updatedTask),
    };
};