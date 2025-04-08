export interface List {
    id: string,
    title: string,
    description?: string
}
export interface Task {
    id: string,
    list_id: string,
    title: string,
    description?: string
}