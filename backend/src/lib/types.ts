export interface List {
    id: number,
    title: string,
    description?: any
}
export interface Task {
    id: number,
    title: string,
    description?: any
    completed: boolean
}