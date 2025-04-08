import { APIGatewayProxyHandler } from 'aws-lambda';
import { createTask } from '../../services/tasks';

export const handler: APIGatewayProxyHandler = async (event) => {
  const body = JSON.parse(event.body!);
  const newList = await createTask(body);
  return {
    statusCode: 201,
    body: JSON.stringify(newList),
  };
};