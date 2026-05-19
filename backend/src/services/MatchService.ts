import { StickerType } from "@prisma/client";
import { StickerItemRepository } from "../repositories/StickerItemRepository";
import { findStickerByCode } from "./stickerCatalog";

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
  sticker: ReturnType<typeof findStickerByCode>;
}

export class MatchService {
  constructor(private readonly stickerItemRepository = new StickerItemRepository()) {}

  async listMatches(): Promise<TradeMatch[]> {
    const [duplicates, wanted] = await Promise.all([
      this.stickerItemRepository.findManyByType(StickerType.DUPLICATE),
      this.stickerItemRepository.findManyByType(StickerType.WANTED)
    ]);

    return duplicates.flatMap((duplicate) =>
      wanted
        .filter((wantedItem) => wantedItem.stickerCode === duplicate.stickerCode)
        .filter((wantedItem) => wantedItem.collectorId !== duplicate.collectorId)
        .map((wantedItem) => ({
          giver: duplicate.collector,
          receiver: wantedItem.collector,
          sticker: findStickerByCode(duplicate.stickerCode)
        }))
        .filter((match) => Boolean(match.sticker))
    );
  }
}
