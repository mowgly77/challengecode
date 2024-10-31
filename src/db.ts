import { Low, JSONFile } from 'lowdb';

type Data = {
  users: Array<{
    id: string;
    email: string;
    password: string;
    balance: number;
    details: Record<string, any>;
  }>;
};

const adapter = new JSONFile<Data>('data/db.json');
const db = new Low(adapter);

// Inicializa la base de datos con una estructura por defecto
(async () => {
  await db.read();
  db.data ||= { users: [] };
  await db.write();
})();

export default db;