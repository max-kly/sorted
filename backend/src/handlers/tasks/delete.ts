import { APIGatewayProxyHandler } from 'aws-lambda';
import { deleteTask } from '../../services/tasks';

export const handler: APIGatewayProxyHandler = async (event) => {
  const { id } = event.pathParameters!;
  const result = await deleteTask(id);
  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
};