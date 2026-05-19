import { Sticker, TradeMatch } from "../types/sticker";
import { apiRequest } from "./api";

export const stickerService = {
  listCatalog: () => apiRequest<Sticker[]>("/stickers"),
  listWanted: (collectorId: string) => apiRequest<Sticker[]>(`/collectors/${collectorId}/wanted`),
  listDuplicates: (collectorId: string) => apiRequest<Sticker[]>(`/collectors/${collectorId}/duplicates`),
  addWanted: (collectorId: string, stickerCode: string) =>
    apiRequest<void>(`/collectors/${collectorId}/wanted`, {
      method: "POST",
      body: JSON.stringify({ stickerCode })
    }),
  addDuplicate: (collectorId: string, stickerCode: string) =>
    apiRequest<void>(`/collectors/${collectorId}/duplicates`, {
      method: "POST",
      body: JSON.stringify({ stickerCode })
    }),
  removeWanted: (collectorId: string, stickerCode: string) =>
    apiRequest<void>(`/collectors/${collectorId}/wanted/${stickerCode}`, {
      method: "DELETE"
    }),
  removeDuplicate: (collectorId: string, stickerCode: string) =>
    apiRequest<void>(`/collectors/${collectorId}/duplicates/${stickerCode}`, {
      method: "DELETE"
    }),
  listMatches: () => apiRequest<TradeMatch[]>("/matches")
};
