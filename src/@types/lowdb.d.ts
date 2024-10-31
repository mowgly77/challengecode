// src/@types/lowdb.d.ts
declare module 'lowdb/adapters/FileSync' {
  export default class FileSync {
      constructor(filePath: string);
      read(): User[];
      write(data: User[]): void;
  }
}

declare module 'lowdb' {
  interface User {
      id: string;
      email: string;
      password: string;
      name?: string;
      balance?: number;
  }

  interface Adapter {
      read: () => User[];
      write: (data: User[]) => void;
  }

  interface Lowdb {
      get: (path: string) => {
          find: (predicate: Partial<User>) => {
              assign: (value: Partial<User>) => this;
              write: () => Lowdb;
              value: () => User | undefined; 
          };
          push: (value: User) => this;
          remove: (predicate: Partial<User>) => this;
      };
      set: (path: string, value: User[]) => void;
      update: (path: string, updater: (value: User[]) => User[]) => void;
      defaults: (defaultValue: { users: User[] }) => Lowdb;
      write: () => void;
  }

  export default function low(adapter: Adapter): Lowdb;
}
