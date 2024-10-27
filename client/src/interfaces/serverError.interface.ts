export interface ServerError {
  errors?: { type: string; messages: string[] }[];
  message?: string;
}