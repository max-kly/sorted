import format from 'pg-format';
import db from './connection';
import tasks from './data/tasks';
import {
    msgSeedingStarted,
    msgSuccessLocalSeeding,
    msgSuccessProductionSeeding,
    msgSuccessLocalDBCleared
} from '../lib/messages';
import { Task } from '../lib/types';
const seed = (tasks: Task[], logMessage: boolean = true) => {
    if (logMessage) console.log(msgSeedingStarted);
    return db.query('DROP TABLE IF EXISTS tasks')
        .then(() => db.query(`
            CREATE TABLE tasks (
            id SERIAL PRIMARY KEY,
            title TEXT NOT NULL,
            description TEXT,
            completed BOOLEAN DEFAULT 'f' NOT NULL
            )`))
        .then(() => {
            const seedTasks = format(
                'INSERT INTO tasks (title, description, completed) VALUES %L',
                tasks.map(({ title, description, completed }) => [
                    title,
                    description,
                    completed
                ])
            );
            return db.query(seedTasks);
        })
        .then(() => {
            if (logMessage) console.log(
                process.env.NODE_ENV === 'test'
                    ? msgSuccessLocalSeeding
                    : msgSuccessProductionSeeding
            );
        });
};
const clearDB = (logMessage: boolean = true) => {
    return db.query('DROP TABLE IF EXISTS tasks')
        .then(() => {
            return db.query(`
                CREATE TABLE tasks (
                  id SERIAL PRIMARY KEY,
                  list_id INT REFERENCES lists(id) NOT NULL,
                  title TEXT NOT NULL,
                  description TEXT,
                  completed BOOLEAN DEFAULT 'f' NOT NULL
                )`)
        })
        .then(() => {
            if (logMessage) console.log(msgSuccessLocalDBCleared)
        })
}

export { seed, clearDB, tasks };