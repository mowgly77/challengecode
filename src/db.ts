import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

// Define las interfaces para la base de datos
interface User {
  id: string;
  email: string;
  password: string;
}

interface Database {
  users: User[];
}

// Crea el adaptador para LowDB
const adapter = new FileSync('data/db.json');
const db = low(adapter);

// Establecer la estructura inicial de la base de datos
db.defaults({ users: [] }).write();

export default db;
