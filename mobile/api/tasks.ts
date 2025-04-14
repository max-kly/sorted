import { api } from "./axios"
import { TaskUpdates, NewTask } from "@/assets/types"

export const fetchTasks = () => {
    return api.get('/tasks')
        .then((data) => {
            return data
        })
}
export const fetchTaskByID = (id: string) => {
    return api.get(`/tasks/${id}`)
        .then((data) => {
            return data
        })
}
export const updateTask = (id: any, updates: TaskUpdates) => {
    return api.patch(`/tasks/${id}`, updates)
        .then((data) => {
            return data
        })
}
export const deleteTask = (id: string) => {
    return api.delete(`/tasks/${id}`)
        .then((data) => {
            return data
        })
}
export const createTask = (task: NewTask) => {
    return api.post(`/tasks/`, task)
        .then((data) => {
            return data
        })
}