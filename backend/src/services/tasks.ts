import { Task } from '../lib/types';
import documentClient from '../db/dynamoClient'
import { v4 as uuidv4 } from 'uuid';
const TableName = process.env.TASKS_TABLE!;

export const getTasks = async () => {
    const data = await documentClient.scan({ TableName }).promise();
    return data.Items;
};
export const getTaskById = async (id: string) => {
    const data = await documentClient.get({
        TableName,
        Key: { id },
    }).promise();
    return data.Item;
};
export const createTask = async (task: Task) => {
    const id = uuidv4();
    const newTask = { id, ...task };
    await documentClient.put({ TableName, Item: newTask }).promise();
    return newTask;
};
export const updateTask = async (id: string, updates: Task) => {
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
export const deleteTask = async (id: string) => {
    await documentClient.delete({ TableName, Key: { id } }).promise();
    return { success: true };
};