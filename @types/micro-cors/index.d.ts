declare module 'micro-cors' {
    import { RequestHandler } from 'micro';
    
    interface CorsOptions {
      origin?: string | string[];
      allowMethods?: string[];
      allowHeaders?: string[];
      exposeHeaders?: string[];
      maxAge?: number;
      allowCredentials?: boolean;
    }
  
    function microCors(options?: CorsOptions): (handler: RequestHandler) => RequestHandler;
  
    export = microCors;
  }
  