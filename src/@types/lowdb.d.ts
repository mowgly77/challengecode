declare module 'lowdb/adapters/FileSync' {
  export default class FileSync {
      constructor(filePath: string);
      read(): User[]; // Método para leer usuarios
      write(data: User[]): void; // Método para escribir datos
  }
}

declare module 'lowdb' {
  // Definición de tipos para los usuarios y sus detalles
  interface User {
      id: string; // o número, dependiendo de tu implementación
      email: string;
      password: string;
      name?: string; // Opcional
      balance?: number; // Opcional
  }

  // Definición de una interfaz para manejar el adaptador
  interface Adapter {
      read: () => User[]; // Método para leer los usuarios
      write: (data: User[]) => void; // Método para escribir datos
  }

  // Interfaz para manejar operaciones en la base de datos
  interface Lowdb {
      get: (path: string) => {
          find: (predicate: Partial<User>) => {
              assign: (value: Partial<User>) => this; // Referencia a 'this' para encadenar
              write: () => Lowdb; // Método write en el objeto que devuelve find
              value: () => User | undefined; 
          };
          push: (value: User) => this; // Agregar el método push aquí
      };
      set: (path: string, value: User[]) => void; // Cambiado para que acepte un array de User
      update: (path: string, updater: (value: User[]) => User[]) => void; // Cambiado para que acepte un array de User
      defaults: (defaultValue: { users: User[] }) => Lowdb; // Cambiar la firma para aceptar un objeto con un array de User
      write: () => void; // Agregar el método write aquí para la instancia de Lowdb
  }

  export default function low(adapter: Adapter): Lowdb;
}
