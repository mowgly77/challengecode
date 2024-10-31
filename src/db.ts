import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

// Define las interfaces para la base de datos
interface User {
  id: string;
  email: string;
  password: string;
}

// Interface para la base de datos
interface Database {
  users: User[];
}

// Crea el adaptador de archivo
const adapter = new FileSync('data/db.json'); // Elimina <Database>
const db = low(adapter);

// Establecer la estructura inicial de la base de datos
db.defaults({ users: [] }).write();

export default db;
