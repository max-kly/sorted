import { APIGatewayProxyEvent, Context, APIGatewayProxyResult } from 'aws-lambda';
import { createTask } from '../services/tasks';

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  const body = JSON.parse(event.body!) || null;
  if (!body) return { statusCode: 400, body: 'Task was not provided' };
  const newTask = await createTask(body);
  return {
    statusCode: 201,
    body: JSON.stringify(newTask),
  };
};