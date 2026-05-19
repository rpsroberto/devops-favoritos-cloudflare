import { StickerType } from "@prisma/client";
import { z } from "zod";
import { AppError } from "../middlewares/AppError";
import { CollectorRepository } from "../repositories/CollectorRepository";
import { StickerItemRepository } from "../repositories/StickerItemRepository";
import { findStickerByCode, Sticker, stickerCatalog } from "./stickerCatalog";

const stickerItemSchema = z.object({
  stickerCode: z.string().trim().min(3, "Informe o código da figurinha.").toUpperCase()
});

export interface CollectorSticker extends Sticker {
  addedAt: Date;
}

export class StickerService {
  constructor(
    private readonly stickerItemRepository = new StickerItemRepository(),
    private readonly collectorRepository = new CollectorRepository()
  ) {}

  listCatalog() {
    return stickerCatalog;
  }

  async addItem(collectorId: string, data: { stickerCode: string }, type: StickerType) {
    const { stickerCode } = stickerItemSchema.parse(data);
    await this.ensureCollectorExists(collectorId);
    this.ensureStickerExists(stickerCode);

    const existingItem = await this.stickerItemRepository.findByCollectorStickerAndType(collectorId, stickerCode, type);

    if (existingItem) {
      const label = type === "WANTED" ? "desejadas" : "repetidas";
      throw new AppError(`Esta figurinha já está na lista de ${label} do colecionador.`, 409);
    }

    return this.stickerItemRepository.create(collectorId, stickerCode, type);
  }

  async listItems(collectorId: string, type: StickerType): Promise<CollectorSticker[]> {
    await this.ensureCollectorExists(collectorId);
    const items = await this.stickerItemRepository.findManyByCollectorAndType(collectorId, type);

    return items.map((item) => {
      const sticker = this.ensureStickerExists(item.stickerCode);
      return { ...sticker, addedAt: item.createdAt };
    });
  }

  async removeItem(collectorId: string, stickerCodeInput: string, type: StickerType) {
    const { stickerCode } = stickerItemSchema.parse({ stickerCode: stickerCodeInput });
    await this.ensureCollectorExists(collectorId);

    const item = await this.stickerItemRepository.findByCollectorStickerAndType(collectorId, stickerCode, type);

    if (!item) {
      throw new AppError("Figurinha não encontrada nesta lista do colecionador.", 404);
    }

    await this.stickerItemRepository.deleteByCollectorStickerAndType(collectorId, stickerCode, type);
  }

  private async ensureCollectorExists(collectorId: string) {
    const collector = await this.collectorRepository.findById(collectorId);

    if (!collector) {
      throw new AppError("Colecionador não encontrado.", 404);
    }
  }

  private ensureStickerExists(stickerCode: string) {
    const sticker = findStickerByCode(stickerCode);

    if (!sticker) {
      throw new AppError("Figurinha não encontrada no álbum.", 404);
    }

    return sticker;
  }
}
