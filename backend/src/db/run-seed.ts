import db from './connection'
import { seed, tasks } from "./seed";

const runClear = () => {
    return seed(tasks).then(() => db.end())
}
runClear()