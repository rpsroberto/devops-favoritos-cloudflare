import { useEffect, useMemo, useState } from "react";
import { ClientForm } from "../components/ClientForm";
import { ClientList } from "../components/ClientList";
import { ProductGrid } from "../components/ProductGrid";
import { clientService } from "../services/clientService";
import { productService } from "../services/productService";
import { Client, ClientPayload } from "../types/client";
import { Product } from "../types/product";

export function Home() {
  const [clients, setClients] = useState<Client[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const favoriteIds = useMemo(() => favorites.map((favorite) => favorite.id), [favorites]);

  useEffect(() => {
    void loadInitialData();
  }, []);

  useEffect(() => {
    if (selectedClient) {
      void loadFavorites(selectedClient.id);
    } else {
      setFavorites([]);
    }
  }, [selectedClient]);

  async function loadInitialData() {
    try {
      setIsLoading(true);
      const [clientList, productList] = await Promise.all([clientService.list(), productService.list()]);
      setClients(clientList);
      setProducts(productList);
      setSelectedClient(clientList[0] ?? null);
    } catch (error) {
      showError(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function loadFavorites(clientId: string) {
    try {
      const favoriteList = await productService.listFavorites(clientId);
      setFavorites(favoriteList);
    } catch (error) {
      showError(error);
    }
  }

  async function handleSubmitClient(payload: ClientPayload) {
    try {
      if (editingClient) {
        const updatedClient = await clientService.update(editingClient.id, payload);
        setClients((currentClients) =>
          currentClients.map((client) => (client.id === updatedClient.id ? updatedClient : client))
        );
        setSelectedClient(updatedClient);
        setEditingClient(null);
        setMessage("Cliente atualizado com sucesso.");
        return;
      }

      const createdClient = await clientService.create(payload);
      setClients((currentClients) => [createdClient, ...currentClients]);
      setSelectedClient(createdClient);
      setMessage("Cliente criado com sucesso.");
    } catch (error) {
      showError(error);
    }
  }

  async function handleRemoveClient(client: Client) {
    const confirmed = window.confirm(`Remover o cliente ${client.name}?`);

    if (!confirmed) {
      return;
    }

    try {
      await clientService.remove(client.id);
      const nextClients = clients.filter((currentClient) => currentClient.id !== client.id);
      setClients(nextClients);
      setSelectedClient(nextClients[0] ?? null);
      setMessage("Cliente removido com sucesso.");
    } catch (error) {
      showError(error);
    }
  }

  async function handleAddFavorite(product: Product) {
    if (!selectedClient) {
      setMessage("Selecione um cliente antes de favoritar produtos.");
      return;
    }

    try {
      await productService.addFavorite(selectedClient.id, product.id);
      await loadFavorites(selectedClient.id);
      setMessage("Produto adicionado aos favoritos.");
    } catch (error) {
      showError(error);
    }
  }

  async function handleRemoveFavorite(product: Product) {
    if (!selectedClient) {
      return;
    }

    try {
      await productService.removeFavorite(selectedClient.id, product.id);
      setFavorites((currentFavorites) => currentFavorites.filter((favorite) => favorite.id !== product.id));
      setMessage("Produto removido dos favoritos.");
    } catch (error) {
      showError(error);
    }
  }

  function showError(error: unknown) {
    setMessage(error instanceof Error ? error.message : "Ocorreu um erro inesperado.");
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p>DevOps + Cloudflare</p>
          <h1>Favoritos para futuras compras</h1>
        </div>
        <span className="status">{isLoading ? "Carregando" : "Online"}</span>
      </header>

      {message && <div className="feedback">{message}</div>}

      <main className="dashboard">
        <aside className="sidebar">
          <ClientForm editingClient={editingClient} onSubmit={handleSubmitClient} onCancelEdit={() => setEditingClient(null)} />
          <ClientList
            clients={clients}
            selectedClientId={selectedClient?.id ?? null}
            onSelect={setSelectedClient}
            onEdit={setEditingClient}
            onRemove={handleRemoveClient}
          />
        </aside>

        <section className="content">
          <div className="selected-client">
            <span>Cliente selecionado</span>
            <strong>{selectedClient ? `${selectedClient.name} - ${selectedClient.email}` : "Nenhum cliente selecionado"}</strong>
          </div>

          <ProductGrid
            title="Produtos da Fake Store"
            products={products}
            actionLabel="Favoritar"
            emptyMessage="Nenhum produto encontrado."
            disabled={!selectedClient}
            favoriteIds={favoriteIds}
            onAction={handleAddFavorite}
          />

          <ProductGrid
            title="Favoritos do cliente"
            products={favorites}
            actionLabel="Remover favorito"
            emptyMessage="Este cliente ainda não possui favoritos."
            onAction={handleRemoveFavorite}
          />
        </section>
      </main>

      <footer>Equipe DevOps Favoritos - Atividade Prática de DevOps</footer>
    </div>
  );
}
