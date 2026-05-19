import { Collector } from "../types/collector";

interface CollectorListProps {
  collectors: Collector[];
  selectedCollectorId: string | null;
  onSelect: (collector: Collector) => void;
  onEdit: (collector: Collector) => void;
  onRemove: (collector: Collector) => void;
}

export function CollectorList({ collectors, selectedCollectorId, onSelect, onEdit, onRemove }: CollectorListProps) {
  return (
    <section className="panel">
      <div className="panel-heading">
        <h2>Colecionadores</h2>
        <span>{collectors.length} ativos</span>
      </div>

      <div className="collector-list">
        {collectors.map((collector) => (
          <article className={collector.id === selectedCollectorId ? "collector-card selected" : "collector-card"} key={collector.id}>
            <button className="collector-main" type="button" onClick={() => onSelect(collector)}>
              <strong>{collector.name}</strong>
              <small>{collector.email}</small>
              {collector.city && <small>{collector.city}</small>}
            </button>
            <div className="row-actions">
              <button type="button" onClick={() => onEdit(collector)}>
                Editar
              </button>
              <button className="danger" type="button" onClick={() => onRemove(collector)}>
                Remover
              </button>
            </div>
          </article>
        ))}

        {collectors.length === 0 && <p className="empty">Nenhum colecionador cadastrado.</p>}
      </div>
    </section>
  );
}
