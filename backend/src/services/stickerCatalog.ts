export interface Sticker {
  code: string;
  number: number;
  player: string;
  country: string;
  position: string;
  rarity: "Comum" | "Especial" | "Lendária";
  image: string;
}

export const stickerCatalog: Sticker[] = [
  {
    code: "BRA-10",
    number: 10,
    player: "Ney Silva",
    country: "Brasil",
    position: "Atacante",
    rarity: "Lendária",
    image: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=600&q=80"
  },
  {
    code: "ARG-10",
    number: 10,
    player: "Leo Campos",
    country: "Argentina",
    position: "Meia",
    rarity: "Lendária",
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=600&q=80"
  },
  {
    code: "FRA-09",
    number: 9,
    player: "Kylian Moreau",
    country: "França",
    position: "Atacante",
    rarity: "Especial",
    image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=600&q=80"
  },
  {
    code: "POR-07",
    number: 7,
    player: "Cristiano Alves",
    country: "Portugal",
    position: "Atacante",
    rarity: "Lendária",
    image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=600&q=80"
  },
  {
    code: "ESP-08",
    number: 8,
    player: "Pedri Torres",
    country: "Espanha",
    position: "Meia",
    rarity: "Especial",
    image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=600&q=80"
  },
  {
    code: "GER-01",
    number: 1,
    player: "Manuel Bauer",
    country: "Alemanha",
    position: "Goleiro",
    rarity: "Comum",
    image: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=600&q=80"
  },
  {
    code: "ENG-11",
    number: 11,
    player: "Harry Stone",
    country: "Inglaterra",
    position: "Atacante",
    rarity: "Especial",
    image: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=600&q=80"
  },
  {
    code: "JPN-14",
    number: 14,
    player: "Haru Tanaka",
    country: "Japão",
    position: "Meia",
    rarity: "Comum",
    image: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=600&q=80"
  },
  {
    code: "URU-05",
    number: 5,
    player: "Federico Costa",
    country: "Uruguai",
    position: "Volante",
    rarity: "Comum",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80"
  },
  {
    code: "MAR-04",
    number: 4,
    player: "Achraf El Idrissi",
    country: "Marrocos",
    position: "Defensor",
    rarity: "Especial",
    image: "https://images.unsplash.com/photo-1570498839593-e565b39455fc?auto=format&fit=crop&w=600&q=80"
  },
  {
    code: "USA-21",
    number: 21,
    player: "Christian Miller",
    country: "Estados Unidos",
    position: "Ponta",
    rarity: "Comum",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=600&q=80"
  },
  {
    code: "MEX-13",
    number: 13,
    player: "Guillermo Rojas",
    country: "México",
    position: "Goleiro",
    rarity: "Comum",
    image: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&w=600&q=80"
  }
];

export function findStickerByCode(code: string) {
  return stickerCatalog.find((sticker) => sticker.code === code);
}
