import {
  APIGatewayProxyEvent,
  Context,
  APIGatewayProxyResult,
} from 'aws-lambda';
import { getTaskById } from '../services/tasks';

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  const { id } = event.pathParameters || {};
  if (!id) return { statusCode: 400, body: 'Task ID is required' }
  const task = await getTaskById(id);
  if (task.msg) return { statusCode: 404, body: task.msg }
  return {
    statusCode: 200,
    body: JSON.stringify(task)
  };
};