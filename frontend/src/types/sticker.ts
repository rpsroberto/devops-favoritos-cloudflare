export interface Sticker {
  code: string;
  number: number;
  player: string;
  country: string;
  position: string;
  rarity: "Comum" | "Especial" | "Lendária";
  image: string;
  addedAt?: string;
}

export interface TradeMatch {
  giver: {
    id: string;
    name: string;
    email: string;
    city?: string | null;
  };
  receiver: {
    id: string;
    name: string;
    email: string;
    city?: string | null;
  };
  sticker: Sticker;
}
