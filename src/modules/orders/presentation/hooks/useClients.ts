import { useState, useEffect, useCallback } from 'react';
import type { Client } from '../../domain/entities';
import { OrdersContainer } from '../../infrastructure/container/OrdersContainer';

export function useClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const clientRepository = OrdersContainer.getClientRepository();

  const loadClients = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const clientsData = await clientRepository.getAll();
      setClients(clientsData);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'No se pudieron cargar los clientes. Intenta nuevamente.'
      );
    } finally {
      setLoading(false);
    }
  }, [clientRepository]);

  const searchClients = useCallback(async (query: string): Promise<Client[]> => {
    if (!query.trim()) {
      return clientRepository.getAll();
    }
    return clientRepository.search(query);
  }, [clientRepository]);

  useEffect(() => {
    loadClients();
  }, [loadClients]);

  return {
    clients,
    loading,
    error,
    searchClients,
    refresh: loadClients,
  };
}
