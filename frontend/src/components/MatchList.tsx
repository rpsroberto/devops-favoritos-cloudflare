import { TradeMatch } from "../types/sticker";

interface MatchListProps {
  matches: TradeMatch[];
}

export function MatchList({ matches }: MatchListProps) {
  return (
    <section className="panel">
      <div className="panel-heading">
        <h2>Possíveis trocas</h2>
        <span>{matches.length} matches</span>
      </div>

      <div className="match-list">
        {matches.map((match) => (
          <article className="match-card" key={`${match.giver.id}-${match.receiver.id}-${match.sticker.code}`}>
            <strong>{match.giver.name}</strong>
            <span>tem repetida a figurinha {match.sticker.code}</span>
            <strong>{match.receiver.name}</strong>
            <span>procura {match.sticker.player} ({match.sticker.country})</span>
          </article>
        ))}

        {matches.length === 0 && <p className="empty">Nenhuma troca encontrada ainda.</p>}
      </div>
    </section>
  );
}
