import type { IClientRepository } from '../../domain/repositories';
import type { Client } from '../../domain/entities';

/**
 * Mock implementation of IClientRepository
 * Provides demo client data for the application
 */
export class MockClientRepository implements IClientRepository {
  private clients: Client[] = [
    { id: 'client_1', name: 'Abarrotes La Esquina', address: 'Av. Principal 123', phone: '555-0101' },
    { id: 'client_2', name: 'Supermercado El Ahorro', address: 'Calle 5 de Mayo 456', phone: '555-0102' },
    { id: 'client_3', name: 'Tienda Doña María', address: 'Colonia Centro 789', phone: '555-0103' },
    { id: 'client_4', name: 'Minisuper Los Ángeles', address: 'Av. Revolución 321', phone: '555-0104' },
    { id: 'client_5', name: 'Farmacia San José', address: 'Blvd. Hidalgo 555', phone: '555-0105' },
    { id: 'client_6', name: 'Papelería El Estudiante', address: 'Calle Morelos 888', phone: '555-0106' },
  ];

  async getAll(): Promise<Client[]> {
    return [...this.clients];
  }

  async getById(id: string): Promise<Client | null> {
    return this.clients.find(client => client.id === id) || null;
  }

  async search(query: string): Promise<Client[]> {
    const lowerQuery = query.toLowerCase();
    return this.clients.filter(client =>
      client.name.toLowerCase().includes(lowerQuery) ||
      client.address.toLowerCase().includes(lowerQuery)
    );
  }
}
