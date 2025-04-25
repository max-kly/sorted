import { APIGatewayProxyEvent, Context, APIGatewayProxyResult } from 'aws-lambda';
import { createTask } from '../../services/tasks';

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  const body = JSON.parse(event.body!) || null;
  if (!body) return { statusCode: 400, body: 'ID and task were not provided' };
  if (!body.task) return { statusCode: 400, body: 'Task was not provided' };
  if (!body.user_id) return { statusCode: 400, body: 'User ID was not provided' };
  const newTask = await createTask(body.user_id, body.task);
  return {
    statusCode: 201,
    body: JSON.stringify(newTask),
  };
};