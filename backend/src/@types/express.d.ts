/**
 * Overriding the Express Request including User
 * id is required and name is optional
 */

declare namespace Express {
  export interface Request {
    user: {
      id: string
      name?: string
    }
  }
}
