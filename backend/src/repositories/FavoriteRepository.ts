import { prisma } from "../prisma/client";

export class FavoriteRepository {
  create(clientId: string, productId: number) {
    return prisma.favorite.create({ data: { clientId, productId } });
  }

  findByClientAndProduct(clientId: string, productId: number) {
    return prisma.favorite.findUnique({
      where: { clientId_productId: { clientId, productId } }
    });
  }

  findManyByClient(clientId: string) {
    return prisma.favorite.findMany({
      where: { clientId },
      orderBy: { createdAt: "desc" }
    });
  }

  deleteByClientAndProduct(clientId: string, productId: number) {
    return prisma.favorite.delete({
      where: { clientId_productId: { clientId, productId } }
    });
  }
}
