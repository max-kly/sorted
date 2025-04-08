import { APIGatewayProxyHandler } from 'aws-lambda';
import { getTasks } from '../../services/tasks';

export const handler: APIGatewayProxyHandler = async () => {
  const tasks = await getTasks();
  return {
    statusCode: 200,
    body: JSON.stringify(tasks),
  };
};