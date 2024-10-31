declare module 'lowdb/adapters/FileSync' {
    export default class FileSync {
      constructor(filePath: string);
      // Métodos que necesites declarar
    }
  }
  
  declare module 'lowdb' {
    export default function low(adapter: any): any;
  }
  