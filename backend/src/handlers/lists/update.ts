import { APIGatewayProxyHandler } from 'aws-lambda';
import { updateList } from '../../services/lists';

export const handler: APIGatewayProxyHandler = async (event) => {
    const { id } = event.pathParameters!;
    const updates = JSON.parse(event.body!);
    const updatedList = await updateList(id, updates);
    return {
        statusCode: 200,
        body: JSON.stringify(updatedList),
    };
};