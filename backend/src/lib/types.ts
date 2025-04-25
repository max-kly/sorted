export interface List {
    id: number,
    title: string,
    description?: any
}
export interface Task {
    id: number,
    user_id: number,
    title: string,
    description?: any
    completed: boolean
}
export interface User {
    id: number,
    email: string,
    password: string,
    full_name: string
}