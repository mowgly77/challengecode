declare module 'lowdb' {
    import { LowdbSync } from 'lowdb';
    export function low<T>(adapter: any): LowdbSync<T>;
    export default low;
  }
  
  declare module 'lowdb/adapters/FileSync' {
    class FileSync<T> {
      constructor(filename: string);
    }
    export default FileSync;
  }
  