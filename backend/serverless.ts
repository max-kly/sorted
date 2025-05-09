const dotenv = require('dotenv');
dotenv.config({ path: '.env.production' });

const serverlessConfiguration = {
  service: 'sorted-todo-app',
  plugins: ['serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    region: 'eu-west-2',
    stage: 'prod',
    environment: {
      DATABASE_URL: process.env.DATABASE_URL || '',
    },
  },
  functions: {
    getTasks: {
      handler: 'src/handlers/getAll.handler',
      events: [{ http: { method: 'get', path: 'tasks', cors: true } }],
    },
    createTask: {
      handler: 'src/handlers/create.handler',
      events: [{ http: { method: 'post', path: 'tasks', cors: true } }],
    },
    getTaskByID: {
      handler: 'src/handlers/getTask.handler',
      events: [{ http: { method: 'get', path: 'tasks/{id}', cors: true } }],
    },
    updateTask: {
      handler: 'src/handlers/update.handler',
      events: [{ http: { method: 'patch', path: 'tasks/{id}', cors: true } }],
    },
    deleteTask: {
      handler: 'src/handlers/delete.handler',
      events: [{ http: { method: 'delete', path: 'tasks/{id}', cors: true } }],
    },
  },
  custom: {
    'serverless-offline': {
      httpPort: 3000,
    },
  },
};

module.exports = serverlessConfiguration;