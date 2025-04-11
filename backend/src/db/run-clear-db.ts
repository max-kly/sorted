import db from './connection'
import { clearDB } from "./seed";

const runClear = () => {
    return clearDB().then(() => db.end())
}
runClear()