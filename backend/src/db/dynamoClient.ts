import { DynamoDB } from "aws-sdk"

const isOffline = process.env.IS_OFFLINE;
const options: DynamoDB.DocumentClient.DocumentClientOptions & DynamoDB.ClientConfiguration = isOffline
    ? {
        region: 'localhost',
        endpoint: 'http://localhost:8000',
    }
    : {};
const documentClient = new DynamoDB.DocumentClient(options);

export default documentClient;