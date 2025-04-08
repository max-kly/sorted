import { APIGatewayProxyHandler } from 'aws-lambda';
import { deleteList } from '../../services/lists';

export const handler: APIGatewayProxyHandler = async (event) => {
  const { id } = event.pathParameters!;
  const result = await deleteList(id);
  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
};