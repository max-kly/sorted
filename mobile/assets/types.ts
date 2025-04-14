export interface List {
    id: number,
    title: string,
    description?: any
}
export interface Task {
    id: string,
    title: string,
    description?: any
    completed: boolean
}
export interface NewTask {
    title: string,
    description?: any
}
export interface TaskUpdates {
    title?: string | null,
    description?: string | null
    completed?: boolean
}