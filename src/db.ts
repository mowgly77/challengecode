// db.ts
import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import path from 'path';

// Crea el adaptador
const dbPath = path.join(process.cwd(), 'data', 'db.json');
const adapter = new FileSync(dbPath);
const db = low(adapter);

// Establece los valores predeterminados para la base de datos
db.defaults({ users: [] }).write(); // Inicializa con una lista vacía de usuarios

// Exporta la base de datos como exportación por defecto
export default db;
