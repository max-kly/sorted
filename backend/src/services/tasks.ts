import { Task } from '../lib/types';
import db from '../db/connection'
import { createUpdateQuery } from '../lib/utils';
export const createTask = async (task: Task) => {
    const data = await db.query('INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *', [task.title, task.description])
    return { task: data.rows[0] };
};
export const getTasks = async () => {
    const data = await db.query('SELECT * FROM tasks');
    return !data.rows.length ? { msg: 'No tasks found' } : { tasks: data.rows };
};
export const deleteTask = async (id: string) => {
    await db.query('DELETE FROM tasks WHERE id = $1', [id])
    return { msg: 'Task was deleted' };
};
export const getTaskById = async (id: string) => {
    const data = await db.query('SELECT * FROM tasks WHERE id = $1', [id])
    return !data.rows.length ? { msg: 'No task with such ID' } : { task: data.rows[0] };
};
export const updateTask = async (id: string, updates: any) => {
    if (!updates || Object.keys(updates).length === 0) {
        throw new Error('No fields to update provided.');
    }
    const updateQuery = createUpdateQuery('tasks', updates, id)
    const data = await db.query(updateQuery.clause, updateQuery.values)
    return { task: data.rows[0] }
};
export const getTasksByTask = async (id: string) => {
    const data = await db.query('SELECT * FROM tasks WHERE task_id = $1', [id])
    return { tasks: data.rows };
}