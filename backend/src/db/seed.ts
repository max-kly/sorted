import format from 'pg-format';
import db from './connection';
import bcrypt from 'bcrypt';
import {
    msgSeedingStarted,
    msgSuccessLocalSeeding,
    msgSuccessProductionSeeding,
    msgSuccessLocalDBCleared
} from '../lib/messages';
import { Task, User } from '../lib/types';
const seed = (tasks: Task[], users: User[], logMessage: boolean = true) => {
    if (logMessage) console.log(msgSeedingStarted);
    return db.query('DROP TABLE IF EXISTS tasks')
        .then(() => {
            return db.query('DROP TABLE IF EXISTS users')
        })
        .then(() => {
            return db.query(`
            CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            email TEXT NOT NULL,
            password TEXT NOT NULL,
            full_name TEXT NOT NULL
            )`)
        })
        .then(() => {
            return db.query(`
            CREATE TABLE tasks (
            id SERIAL PRIMARY KEY,
            user_id INT NOT NULL REFERENCES users(id),
            title TEXT NOT NULL,
            description TEXT,
            completed BOOLEAN DEFAULT 'f' NOT NULL
            )`)
        })
        .then(() => {
            const seedUsers = format(
                'INSERT INTO users (email, password, full_name) VALUES %L',
                users.map(({ email, password, full_name }) => [
                    email,
                    bcrypt.hashSync(password, 15),
                    full_name
                ])
            );
            return db.query(seedUsers)
        })
        .then(() => {
            const seedTasks = format(
                'INSERT INTO tasks (user_id, title, description, completed) VALUES %L',
                tasks.map(({ user_id, title, description, completed }) => [
                    user_id,
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
            return db.query('DROP TABLE IF EXISTS users')
        })
        .then(() => {
            return db.query(`
            CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            email TEXT NOT NULL,
            password TEXT NOT NULL,
            full_name TEXT NOT NULL
            )`)
        })
        .then(() => {
            return db.query(`
            CREATE TABLE tasks (
            id SERIAL PRIMARY KEY,
            user_id INT NOT NULL REFERENCES users(id),
            title TEXT NOT NULL,
            description TEXT,
            completed BOOLEAN DEFAULT 'f' NOT NULL
            )`)
        })
        .then(() => {
            if (logMessage) console.log(msgSuccessLocalDBCleared)
        })
}

export { seed, clearDB };