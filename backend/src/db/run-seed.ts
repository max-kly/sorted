import db from './connection'
import { seed } from "./seed";
import tasks from './data/tasks';
import users from './data/users';

const runSeed = () => {
    return seed(tasks, users).then(() => db.end())
}
runSeed()