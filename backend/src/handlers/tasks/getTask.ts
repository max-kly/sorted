import { APIGatewayProxyHandler } from 'aws-lambda';
import { getTaskById } from '../../services/tasks';

export const main: APIGatewayProxyHandler = async (event) => {
  const { id } = event.pathParameters;
  if (!id) return { statusCode: 400, body: 'Task ID is required' };
  const task = await getTaskById(id);
  return {
    statusCode: 200,
    body: JSON.stringify(task)
  };
};