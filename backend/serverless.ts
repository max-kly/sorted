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
      handler: 'src/handlers/tasks/getAll.handler',
      events: [{ http: { method: 'get', path: 'tasks', cors: true } }],
    },
    createTask: {
      handler: 'src/handlers/tasks/create.handler',
      events: [{ http: { method: 'post', path: 'tasks', cors: true } }],
    },
    getTaskByID: {
      handler: 'src/handlers/tasks/getTask.handler',
      events: [{ http: { method: 'get', path: 'tasks/{id}', cors: true } }],
    },
    updateTask: {
      handler: 'src/handlers/tasks/update.handler',
      events: [{ http: { method: 'patch', path: 'tasks/{id}', cors: true } }],
    },
    deleteTask: {
      handler: 'src/handlers/tasks/delete.handler',
      events: [{ http: { method: 'delete', path: 'tasks/{id}', cors: true } }],
    },
    loginUser: {
      handler: 'src/handles/users/login.handler',
      events: [{ http: { method: 'get', path: 'users/login', cors: true } }]
    },
    getUser: {
      handler: 'src/handles/users/get.handler',
      events: [{ http: { method: 'get', path: 'users/{id}}', cors: true } }]
    },
    updateUser: {
      handler: 'src/handles/users/update.handler',
      events: [{ http: { method: 'patch', path: 'users/{id}}', cors: true } }]
    },
    deleteUser: {
      handler: 'src/handles/users/delete.handler',
      events: [{ http: { method: 'delete', path: 'users/{id}}', cors: true } }]
    }
  },
  custom: {
    'serverless-offline': {
      httpPort: 3000,
    },
  },
};

module.exports = serverlessConfiguration;