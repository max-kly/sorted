import db from '../src/db/connection'
import { handler as login } from '../src/handlers/users/login'
import { generateMockEvent } from '../src/lib/utils'
import { APIGatewayProxyResult } from 'aws-lambda'
import tasks from '../src/db/data/tasks'
import users from '../src/db/data/users'
import { seed } from '../src/db/seed'

beforeEach(() => seed(tasks, users, false))
afterAll(() => db.end())

describe('login() handler:', () => {
    test('Status: 400 => Returns a "Email and password are required" message for missing details', async () => {
        const requestWithoutPassword = generateMockEvent({ queryStringParameters: { email: 'wvxkly@gmail.com' } })
        const requestWithoutEmail = generateMockEvent({ queryStringParameters: { password: 'myPassword123!' } })
        const responseWithoutPassword: APIGatewayProxyResult = await login(requestWithoutPassword, {} as any);
        const responseWithoutEmail: APIGatewayProxyResult = await login(requestWithoutEmail, {} as any);
        expect(responseWithoutPassword.statusCode).toBe(400)
        expect(responseWithoutEmail.statusCode).toBe(400)
        expect(responseWithoutPassword.body).toBe('Email and password are required')
        expect(responseWithoutEmail.body).toBe('Email and password are required')

    })
    test('Status: 404 => Returns a "User is not found" message for non-existing email', async () => {
        const request = generateMockEvent({ queryStringParameters: { email: 'billgates@gmail.com', password: 'microsoft!' } })
        const response: APIGatewayProxyResult = await login(request, {} as any);
        expect(response.statusCode).toBe(404)
        expect(response.body).toBe('User is not found')
    })
    test('Status: 401 => Returns a "Invalid user details" for wrong password', async () => {
        const request = generateMockEvent({ queryStringParameters: { email: 'wvxkly@gmail.com', password: 'qwerty!1!' } })
        const response: APIGatewayProxyResult = await login(request, {} as any);
        expect(response.statusCode).toBe(401)
        expect(response.body).toBe('Invalid user details')
    })
    test('Status: 200 => Returns a user details for valid login data', async () => {
        const request = generateMockEvent({ queryStringParameters: { email: 'wvxkly@gmail.com', password: 'myPassword123!' } })
        const response: APIGatewayProxyResult = await login(request, {} as any);
        expect(response.statusCode).toBe(200)
        expect(JSON.parse(response.body)).toEqual({ user: { id: 1, email: 'wvxkly@gmail.com', full_name: 'Max Kly' } })
    })
})