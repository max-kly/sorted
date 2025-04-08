import { APIGatewayProxyHandler } from 'aws-lambda';
import { createList } from '../../services/lists';

export const handler: APIGatewayProxyHandler = async (event) => {
  const body = JSON.parse(event.body!);
  const newTask = await createList(body);
  return {
    statusCode: 201,
    body: JSON.stringify(newTask),
  };
};