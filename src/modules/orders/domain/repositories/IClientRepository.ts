import type { Client } from '../entities';

/**
 * Interface for Client Repository (Dependency Inversion Principle)
 * Read-only operations for clients (demo data)
 */
export interface IClientRepository {
  getAll(): Promise<Client[]>;
  getById(id: string): Promise<Client | null>;
  search(query: string): Promise<Client[]>;
}
