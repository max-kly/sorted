import { APIGatewayProxyEvent, Context, APIGatewayProxyResult } from 'aws-lambda';
import { deleteTask } from '../services/tasks';

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  const { id } = event.pathParameters || {};
  if (!id) return { statusCode: 400, body: 'Task ID is required' };
  const result = await deleteTask(id);
  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
};