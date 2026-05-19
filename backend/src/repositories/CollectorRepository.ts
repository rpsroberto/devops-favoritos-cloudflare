import { prisma } from "../prisma/client";

export interface CollectorInput {
  name: string;
  email: string;
  city?: string | null;
}

export class CollectorRepository {
  create(data: CollectorInput) {
    return prisma.collector.create({ data });
  }

  findAll() {
    return prisma.collector.findMany({ orderBy: { createdAt: "desc" } });
  }

  findById(id: string) {
    return prisma.collector.findUnique({ where: { id } });
  }

  findByEmail(email: string) {
    return prisma.collector.findUnique({ where: { email } });
  }

  update(id: string, data: CollectorInput) {
    return prisma.collector.update({ where: { id }, data });
  }

  delete(id: string) {
    return prisma.collector.delete({ where: { id } });
  }
}
