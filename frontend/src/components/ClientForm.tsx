import { FormEvent, useEffect, useState } from "react";
import { Client, ClientPayload } from "../types/client";

interface ClientFormProps {
  editingClient: Client | null;
  onSubmit: (payload: ClientPayload) => Promise<void>;
  onCancelEdit: () => void;
}

export function ClientForm({ editingClient, onSubmit, onCancelEdit }: ClientFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setName(editingClient?.name ?? "");
    setEmail(editingClient?.email ?? "");
  }, [editingClient]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit({ name, email });
      setName("");
      setEmail("");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="panel form-panel" onSubmit={handleSubmit}>
      <div className="panel-heading">
        <h2>{editingClient ? "Editar cliente" : "Novo cliente"}</h2>
      </div>

      <label>
        Nome
        <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Maria Silva" required />
      </label>

      <label>
        E-mail
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="maria@email.com"
          type="email"
          required
        />
      </label>

      <div className="actions">
        <button className="primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : "Salvar"}
        </button>
        {editingClient && (
          <button className="secondary" type="button" onClick={onCancelEdit}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
