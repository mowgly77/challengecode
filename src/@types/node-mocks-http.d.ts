declare module 'node-mocks-http' {
    import { IncomingMessage, ServerResponse } from 'http';
  
    export function createRequest(options?: {
      method?: string;
      url?: string;
      headers?: Record<string, string>;
      body?: any;
      query?: Record<string, any>;
    }): IncomingMessage;
  
    export function createResponse(options?: {
      eventEmitter?: any;
      writable?: boolean;
      headers?: Record<string, string>;
      statusCode?: number;
    }): Response;
  
    export interface Response extends ServerResponse {
      json: (data: any) => void;
    }
  }
  