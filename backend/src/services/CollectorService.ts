import { z } from "zod";
import { AppError } from "../middlewares/AppError";
import { CollectorInput, CollectorRepository } from "../repositories/CollectorRepository";

const collectorSchema = z.object({
  name: z.string().trim().min(2, "O nome deve ter pelo menos 2 caracteres."),
  email: z.string().trim().email("Informe um e-mail válido.").toLowerCase(),
  city: z.string().trim().max(80, "A cidade deve ter no máximo 80 caracteres.").optional().nullable()
});

export class CollectorService {
  constructor(private readonly collectorRepository = new CollectorRepository()) {}

  async create(data: CollectorInput) {
    const parsedData = collectorSchema.parse(data);
    const collectorWithSameEmail = await this.collectorRepository.findByEmail(parsedData.email);

    if (collectorWithSameEmail) {
      throw new AppError("Já existe um colecionador cadastrado com este e-mail.", 409);
    }

    return this.collectorRepository.create(parsedData);
  }

  list() {
    return this.collectorRepository.findAll();
  }

  async getById(id: string) {
    const collector = await this.collectorRepository.findById(id);

    if (!collector) {
      throw new AppError("Colecionador não encontrado.", 404);
    }

    return collector;
  }

  async update(id: string, data: CollectorInput) {
    const parsedData = collectorSchema.parse(data);
    const collector = await this.getById(id);
    const collectorWithSameEmail = await this.collectorRepository.findByEmail(parsedData.email);

    if (collectorWithSameEmail && collectorWithSameEmail.id !== collector.id) {
      throw new AppError("Já existe outro colecionador cadastrado com este e-mail.", 409);
    }

    return this.collectorRepository.update(id, parsedData);
  }

  async delete(id: string) {
    await this.getById(id);
    await this.collectorRepository.delete(id);
  }
}
