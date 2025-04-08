import { List } from '../lib/types';
import documentClient from '../db/dynamoClient'
import { v4 as uuidv4 } from 'uuid';
const TableName = process.env.LISTS_TABLE!;

export const createList = async (list: List) => {
    const id = uuidv4();
    const newList = { id, ...list };
    await documentClient.put({ TableName, Item: newList }).promise();
    return newList;
};
export const getLists = async () => {
    const data = await documentClient.scan({ TableName }).promise();
    return data.Items;
};
export const deleteList = async (id: string) => {
    await documentClient.delete({ TableName, Key: { id } }).promise();
    return { success: true };
};
export const getListById = async (id: string) => {
    const data = await documentClient.get({
        TableName,
        Key: { id },
    }).promise();
    return data.Item;
};
export const updateList = async (id: string, updates: List) => {
    if (!updates || Object.keys(updates).length === 0) {
        throw new Error('No fields to update provided.');
    }
    const ExpressionAttributeNames: Record<string, string> = {};
    const ExpressionAttributeValues: Record<string, any> = {};
    const updateExpressions: string[] = [];
    for (const [key, value] of Object.entries(updates)) {
        const attrName = `#${key}`;
        const attrValue = `:${key}`;
        ExpressionAttributeNames[attrName] = key;
        ExpressionAttributeValues[attrValue] = value;
        updateExpressions.push(`${attrName} = ${attrValue}`);
    }
    const params = {
        TableName,
        Key: { id },
        UpdateExpression: `SET ${updateExpressions.join(', ')}`,
        ExpressionAttributeNames,
        ExpressionAttributeValues,
        ReturnValues: 'ALL_NEW',
    };
    const result = await documentClient.update(params).promise();
    return result.Attributes;
};
export const getTasksByList = async (id: string) => {
    const params = {
        TableName: TableName,
        IndexName: 'ListIdIndex',
        KeyConditionExpression: 'list_id = :id',
        ExpressionAttributeValues: {
            ':id': id,
        },
    };
    const result = await documentClient.query(params).promise();
    return result.Items;
}