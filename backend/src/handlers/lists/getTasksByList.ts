import { APIGatewayProxyHandler } from 'aws-lambda';
import { getTasksByList } from '../../services/lists';

export const main: APIGatewayProxyHandler = async (event) => {
  const { id } = event.pathParameters;
  if (!id) return { statusCode: 400, body: 'List ID is required' };
  const tasks = await getTasksByList(id);
  return {
    statusCode: 200,
    body: JSON.stringify(tasks),
  }
}