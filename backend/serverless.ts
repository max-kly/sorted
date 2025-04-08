import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
    service: 'todo-app',
    frameworkVersion: '3',
    plugins: ['serverless-offline', 'serverless-dynamodb-local'],
    provider: {
        name: 'aws',
        runtime: 'nodejs18.x',
        region: 'us-east-1',
        stage: 'dev',
        environment: {
            TASKS_TABLE: 'TasksTable',
            LISTS_TABLE: 'ListsTable',
        },
        iamRoleStatements: [
            {
                Effect: 'Allow',
                Action: ['dynamodb:*'],
                Resource: [
                    { 'Fn::GetAtt': ['TasksTable', 'Arn'] },
                    { 'Fn::GetAtt': ['ListsTable', 'Arn'] },
                ],
            },
        ],
    },
    functions: {
        getTasks: {
            handler: 'src/handlers/tasks/getAll.handler',
            events: [{ http: { method: 'get', path: 'tasks' } }],
        },
        createTask: {
            handler: 'src/handlers/tasks/create.handler',
            events: [{ http: { method: 'post', path: 'tasks' } }],
        },
        getTaskByID: {
            handler: 'src/handlers/tasks/getTask.handler',
            events: [{ http: { method: 'get', path: 'tasks/{id}' } }],
        },
        updateTask: {
            handler: 'src/handlers/tasks/update.handler',
            events: [{ http: { method: 'patch', path: 'tasks/{id}' } }],
        },
        deleteTask: {
            handler: 'src/handlers/tasks/delete.handler',
            events: [{ http: { method: 'delete', path: 'tasks/{id}' } }],
        },
        getLists: {
            handler: 'src/handlers/lists/getAll.handler',
            events: [{ http: { method: 'get', path: 'lists' } }],
        },
        createList: {
            handler: 'src/handlers/lists/create.handler',
            events: [{ http: { method: 'post', path: 'lists' } }],
        },
        getListById: {
            handler: 'src/handlers/lists/getList.handler',
            events: [{ http: { method: 'get', path: 'lists/{id}' } }],
        },
        getTasksByList: {
            handler: 'src/handlers/tasks/getTasksByList.handler',
            events: [{ http: { method: 'get', path: 'lists/{list_id}/tasks' } }],
        },
        updateList: {
            handler: 'src/handlers/lists/update.handler',
            events: [{ http: { method: 'patch', path: 'lists/{id}' } }],
        },
        deleteList: {
            handler: 'src/handlers/lists/delete.handler',
            events: [{ http: { method: 'delete', path: 'lists/{id}' } }],
        },
    },

    resources: {
        Resources: {
            TasksTable: {
                Type: 'AWS::DynamoDB::Table',
                Properties: {
                    TableName: 'TasksTable',
                    AttributeDefinitions: [
                        { AttributeName: 'id', AttributeType: 'S' },
                    ],
                    KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
                    GlobalSecondaryIndexes: [
                        {
                            IndexName: 'ListIdIndex',
                            KeySchema: [{ AttributeName: 'list_id', KeyType: 'HASH' }],
                            Projection: { ProjectionType: 'ALL' },
                        },
                    ],
                    BillingMode: 'PAY_PER_REQUEST',
                },
            },
            ListsTable: {
                Type: 'AWS::DynamoDB::Table',
                Properties: {
                    TableName: 'ListsTable',
                    AttributeDefinitions: [
                        { AttributeName: 'id', AttributeType: 'S' },
                    ],
                    KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
                    BillingMode: 'PAY_PER_REQUEST',
                },
            },
        },
    },

    custom: {
        dynamodb: {
            stages: ['dev'],
            start: {
                port: 8000,
                inMemory: true,
                migrate: true,
            },
        },
    },
};

export default serverlessConfiguration