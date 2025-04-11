import db from '../src/db/connection'
import { handler as getAll } from '../src/handlers/getAll'
import { handler as getTaskByID } from '../src/handlers/getTask'
import { handler as createTask } from '../src/handlers/create'
import { handler as deleteTask } from '../src/handlers/delete'
import { handler as updateTask } from '../src/handlers/update'
import { generateMockEvent } from '../src/lib/utils'
import { APIGatewayProxyResult } from 'aws-lambda'
import { clearDB, seed, tasks } from '../src/db/seed'

beforeEach(() => seed(tasks, false))
afterAll(() => db.end())
describe('getTasks() handler:', () => {
    test('Status: 200 => Returns an array of task objects:', async () => {
        const request = generateMockEvent()
        const response: APIGatewayProxyResult = await getAll(request, {} as any);
        expect(response.statusCode).toBe(200)
        const body = JSON.parse(response.body)
        expect(body).toHaveProperty('tasks')
        expect(body.tasks.length).toBeGreaterThan(0)
    })
    test('Status: 200 => Returns "No tasks found" msg if no tasks in db:', async () => {
        clearDB(false)
        const request = generateMockEvent()
        const response: APIGatewayProxyResult = await getAll(request, {} as any);
        expect(response.statusCode).toBe(200)
        expect(JSON.parse(response.body).msg).toBe('No tasks found')
    })
})
describe('getTask() handler:', () => {
    test('Status: 200 => Returns a task objects:', async () => {
        const request = generateMockEvent({ pathParameters: { id: '1' } })
        const response: APIGatewayProxyResult = await getTaskByID(request, {} as any);
        expect(response.statusCode).toBe(200)
        const body = JSON.parse(response.body)
        const expectedOutput = {
            id: 1,
            title: 'Create serverless api',
            description: null,
            completed: true
        }
        expect(body.task).toEqual(expectedOutput)
    })
    test('Status: 400 => Returns an error for missing task_id:', async () => {
        const request = generateMockEvent()
        const response: APIGatewayProxyResult = await getTaskByID(request, {} as any);
        expect(response.statusCode).toBe(400)
        expect(response.body).toBe('Task ID is required')
    })
    test('Status: 404 => Returns an error for non-existing task:', async () => {
        const request = generateMockEvent({ pathParameters: { id: '122' } })
        const response: APIGatewayProxyResult = await getTaskByID(request, {} as any);
        expect(response.statusCode).toBe(404)
        expect(response.body).toBe('No task with such ID')
    })
})
describe('create() handler:', () => {
    test('Status: 201 => Creates a new task and returns its object:', async () => {
        const request = generateMockEvent({ body: JSON.stringify({ title: "Dive deep into Redux", description: "https://www.youtube.com/watch?v=NqzdVN2tyvQ" }) })
        const response: APIGatewayProxyResult = await createTask(request, {} as any);
        expect(response.statusCode).toBe(201)
        const body = JSON.parse(response.body)
        const expectedOutput = {
            id: 6,
            title: 'Dive deep into Redux',
            description: 'https://www.youtube.com/watch?v=NqzdVN2tyvQ',
            completed: false
        }
        expect(body.task).toEqual(expectedOutput)
        const newRequest = generateMockEvent()
        const newResponse: APIGatewayProxyResult = await getAll(newRequest, {} as any);
        expect(JSON.parse(newResponse.body).tasks.length).toBe(6)
    })
    test('Status: 400 => Returns an error if request body was not provided:', async () => {
        const request = generateMockEvent()
        const response: APIGatewayProxyResult = await createTask(request, {} as any);
        expect(response.statusCode).toBe(400)
        expect(response.body).toBe('Task was not provided')
    })
})
describe('delete() handler:', () => {
    test('Status 200 => Returns a success message once task was deleted:', async () => {
        const request = generateMockEvent({ pathParameters: { id: '1' } })
        const response: APIGatewayProxyResult = await deleteTask(request, {} as any);
        expect(response.statusCode).toBe(200)
        expect(JSON.parse(response.body).msg).toBe('Task was deleted')
        const newReq = generateMockEvent()
        const newRes: APIGatewayProxyResult = await getAll(newReq, {} as any);
        expect(JSON.parse(newRes.body).tasks.length).toBe(4)
    })
    test('Status 400 => Returns an error message for missing task id:', async () => {
        const request = generateMockEvent()
        const response: APIGatewayProxyResult = await deleteTask(request, {} as any);
        expect(response.statusCode).toBe(400)
        expect(response.body).toBe('Task ID is required')
    })
})
describe('update() handler:', () => {
    test('Status 200 => Returns an object for updated task:', async () => {
        const request = generateMockEvent({ pathParameters: { id: '1' }, body: JSON.stringify({ title: "[Backend]:: Create serverless API", description: "Create, test and deploy API to AWS", completed: false }) })
        const response: APIGatewayProxyResult = await updateTask(request, {} as any);
        const expectedOutput = {
            id: 1,
            title: '[Backend]:: Create serverless API',
            description: 'Create, test and deploy API to AWS',
            completed: false
        }
        expect(response.statusCode).toBe(200)
        expect(JSON.parse(response.body).task).toEqual(expectedOutput)
        const newReq = generateMockEvent({ pathParameters: { id: '1' } })
        const newRes: APIGatewayProxyResult = await getTaskByID(newReq, {} as any);
        expect(JSON.parse(newRes.body).task).toEqual(expectedOutput)
    })
    test('Status 400 => Returns an error for missing task id:', async () => {
        const request = generateMockEvent()
        const response: APIGatewayProxyResult = await updateTask(request, {} as any);
        expect(response.statusCode).toBe(400)
        expect(response.body).toBe('Task ID is required')
    })
})