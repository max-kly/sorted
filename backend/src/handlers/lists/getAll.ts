import { APIGatewayProxyHandler } from 'aws-lambda';
import { getLists } from '../../services/lists';

export const handler: APIGatewayProxyHandler = async () => {
    const lists = await getLists();
    return {
        statusCode: 200,
        body: JSON.stringify(lists),
    };
};