import { z } from "zod";
import { AppError } from "../middlewares/AppError";
import { ClientInput, ClientRepository } from "../repositories/ClientRepository";

const clientSchema = z.object({
  name: z.string().trim().min(2, "O nome deve ter pelo menos 2 caracteres."),
  email: z.string().trim().email("Informe um e-mail válido.").toLowerCase()
});

export class ClientService {
  constructor(private readonly clientRepository = new ClientRepository()) {}

  async create(data: ClientInput) {
    const parsedData = clientSchema.parse(data);
    const clientWithSameEmail = await this.clientRepository.findByEmail(parsedData.email);

    if (clientWithSameEmail) {
      throw new AppError("Já existe um cliente cadastrado com este e-mail.", 409);
    }

    return this.clientRepository.create(parsedData);
  }

  list() {
    return this.clientRepository.findAll();
  }

  async getById(id: string) {
    const client = await this.clientRepository.findById(id);

    if (!client) {
      throw new AppError("Cliente não encontrado.", 404);
    }

    return client;
  }

  async update(id: string, data: ClientInput) {
    const parsedData = clientSchema.parse(data);
    const client = await this.getById(id);
    const clientWithSameEmail = await this.clientRepository.findByEmail(parsedData.email);

    if (clientWithSameEmail && clientWithSameEmail.id !== client.id) {
      throw new AppError("Já existe outro cliente cadastrado com este e-mail.", 409);
    }

    return this.clientRepository.update(id, parsedData);
  }

  async delete(id: string) {
    await this.getById(id);
    await this.clientRepository.delete(id);
  }
}
