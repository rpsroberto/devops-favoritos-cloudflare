import { FormEvent, useEffect, useState } from "react";
import { Collector, CollectorPayload } from "../types/collector";

interface CollectorFormProps {
  editingCollector: Collector | null;
  onSubmit: (payload: CollectorPayload) => Promise<void>;
  onCancelEdit: () => void;
}

export function CollectorForm({ editingCollector, onSubmit, onCancelEdit }: CollectorFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setName(editingCollector?.name ?? "");
    setEmail(editingCollector?.email ?? "");
    setCity(editingCollector?.city ?? "");
  }, [editingCollector]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit({ name, email, city });
      setName("");
      setEmail("");
      setCity("");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="panel form-panel" onSubmit={handleSubmit}>
      <div className="panel-heading">
        <h2>{editingCollector ? "Editar colecionador" : "Novo colecionador"}</h2>
      </div>

      <label>
        Nome
        <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Roberto Sousa" required />
      </label>

      <label>
        E-mail
        <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="colecionador@email.com" type="email" required />
      </label>

      <label>
        Cidade
        <input value={city} onChange={(event) => setCity(event.target.value)} placeholder="Fortaleza" />
      </label>

      <div className="actions">
        <button className="primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : "Salvar"}
        </button>
        {editingCollector && (
          <button className="secondary" type="button" onClick={onCancelEdit}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
