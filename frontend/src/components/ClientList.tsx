import { Client } from "../types/client";

interface ClientListProps {
  clients: Client[];
  selectedClientId: string | null;
  onSelect: (client: Client) => void;
  onEdit: (client: Client) => void;
  onRemove: (client: Client) => void;
}

export function ClientList({ clients, selectedClientId, onSelect, onEdit, onRemove }: ClientListProps) {
  return (
    <section className="panel">
      <div className="panel-heading">
        <h2>Clientes</h2>
        <span>{clients.length} cadastrados</span>
      </div>

      <div className="client-list">
        {clients.map((client) => (
          <article className={client.id === selectedClientId ? "client-card selected" : "client-card"} key={client.id}>
            <button className="client-main" type="button" onClick={() => onSelect(client)}>
              <strong>{client.name}</strong>
              <small>{client.email}</small>
            </button>
            <div className="row-actions">
              <button type="button" onClick={() => onEdit(client)}>
                Editar
              </button>
              <button className="danger" type="button" onClick={() => onRemove(client)}>
                Remover
              </button>
            </div>
          </article>
        ))}

        {clients.length === 0 && <p className="empty">Nenhum cliente cadastrado.</p>}
      </div>
    </section>
  );
}
