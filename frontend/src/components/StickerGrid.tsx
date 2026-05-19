import { Sticker } from "../types/sticker";

interface StickerGridProps {
  title: string;
  stickers: Sticker[];
  emptyMessage: string;
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
  disabled?: boolean;
  markedPrimaryCodes?: string[];
  markedSecondaryCodes?: string[];
  onPrimaryAction?: (sticker: Sticker) => void;
  onSecondaryAction?: (sticker: Sticker) => void;
}

export function StickerGrid({
  title,
  stickers,
  emptyMessage,
  primaryActionLabel,
  secondaryActionLabel,
  disabled = false,
  markedPrimaryCodes = [],
  markedSecondaryCodes = [],
  onPrimaryAction,
  onSecondaryAction
}: StickerGridProps) {
  return (
    <section className="panel sticker-section">
      <div className="panel-heading">
        <h2>{title}</h2>
        <span>{stickers.length} figurinhas</span>
      </div>

      <div className="sticker-grid">
        {stickers.map((sticker) => {
          const primaryMarked = markedPrimaryCodes.includes(sticker.code);
          const secondaryMarked = markedSecondaryCodes.includes(sticker.code);

          return (
            <article className="sticker-card" key={sticker.code}>
              <div className="sticker-image">
                <img src={sticker.image} alt={`${sticker.player} - ${sticker.country}`} />
                <span>{sticker.code}</span>
              </div>
              <div className="sticker-content">
                <h3>{sticker.player}</h3>
                <p>{sticker.country}</p>
                <small>
                  Nº {sticker.number} · {sticker.position} · {sticker.rarity}
                </small>
              </div>
              {(primaryActionLabel || secondaryActionLabel) && (
                <div className="sticker-actions">
                  {primaryActionLabel && onPrimaryAction && (
                    <button type="button" disabled={disabled || primaryMarked} onClick={() => onPrimaryAction(sticker)}>
                      {primaryMarked ? "Na lista" : primaryActionLabel}
                    </button>
                  )}
                  {secondaryActionLabel && onSecondaryAction && (
                    <button type="button" disabled={disabled || secondaryMarked} onClick={() => onSecondaryAction(sticker)}>
                      {secondaryMarked ? "Na lista" : secondaryActionLabel}
                    </button>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </div>

      {stickers.length === 0 && <p className="empty">{emptyMessage}</p>}
    </section>
  );
}
