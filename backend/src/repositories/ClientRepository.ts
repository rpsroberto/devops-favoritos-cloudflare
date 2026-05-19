import { prisma } from "../prisma/client";

export interface ClientInput {
  name: string;
  email: string;
}

export class ClientRepository {
  create(data: ClientInput) {
    return prisma.client.create({ data });
  }

  findAll() {
    return prisma.client.findMany({ orderBy: { createdAt: "desc" } });
  }

  findById(id: string) {
    return prisma.client.findUnique({ where: { id } });
  }

  findByEmail(email: string) {
    return prisma.client.findUnique({ where: { email } });
  }

  update(id: string, data: ClientInput) {
    return prisma.client.update({ where: { id }, data });
  }

  delete(id: string) {
    return prisma.client.delete({ where: { id } });
  }
}
