import { StickerType } from "@prisma/client";
import { prisma } from "../prisma/client";

export class StickerItemRepository {
  create(collectorId: string, stickerCode: string, type: StickerType) {
    return prisma.stickerItem.create({ data: { collectorId, stickerCode, type } });
  }

  findByCollectorStickerAndType(collectorId: string, stickerCode: string, type: StickerType) {
    return prisma.stickerItem.findUnique({
      where: { collectorId_stickerCode_type: { collectorId, stickerCode, type } }
    });
  }

  findManyByCollectorAndType(collectorId: string, type: StickerType) {
    return prisma.stickerItem.findMany({
      where: { collectorId, type },
      orderBy: { createdAt: "desc" }
    });
  }

  findManyByType(type: StickerType) {
    return prisma.stickerItem.findMany({
      where: { type },
      include: { collector: true },
      orderBy: { createdAt: "desc" }
    });
  }

  deleteByCollectorStickerAndType(collectorId: string, stickerCode: string, type: StickerType) {
    return prisma.stickerItem.delete({
      where: { collectorId_stickerCode_type: { collectorId, stickerCode, type } }
    });
  }
}
