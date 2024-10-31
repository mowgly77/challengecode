declare module 'node-mocks-http' {
  import { IncomingMessage, ServerResponse } from 'http';

  export function createRequest(options?: {
      method?: string;
      url?: string;
      headers?: Record<string, string>;
      body?: Record<string, unknown>; // Cambiar 'any' a 'unknown' o definir un tipo específico
      query?: Record<string, string | string[]>; // Especifica que los valores pueden ser cadenas o arrays de cadenas
  }): IncomingMessage;

  export function createResponse(options?: {
      eventEmitter?: NodeJS.EventEmitter; // Tipo adecuado
      writable?: boolean;
      headers?: Record<string, string>;
      statusCode?: number;
  }): Response;

  export interface Response extends ServerResponse {
      json: (data: unknown) => void; // Cambiar 'any' a 'unknown'
  }
}
