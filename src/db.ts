import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'db.json');
const adapter = new FileSync(dbPath);
const db = low(adapter);

db.defaults({ users: [] }).write();

export default db;