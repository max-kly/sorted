import { APIGatewayProxyHandler } from 'aws-lambda';
import { getListById } from '../../services/lists';

export const main: APIGatewayProxyHandler = async (event) => {
  const { id } = event.pathParameters;
  if (!id) return { statusCode: 400, body: 'List ID is required' };
  const list = await getListById(id);
  return {
    statusCode: 200,
    body: JSON.stringify(list)
  };
};