import { Request, Response } from "express";
import { ClientService } from "../services/ClientService";

export class ClientController {
  constructor(private readonly clientService = new ClientService()) {}

  create = async (request: Request, response: Response) => {
    const client = await this.clientService.create(request.body);
    return response.status(201).json(client);
  };

  list = async (_request: Request, response: Response) => {
    const clients = await this.clientService.list();
    return response.json(clients);
  };

  getById = async (request: Request, response: Response) => {
    const client = await this.clientService.getById(request.params.id);
    return response.json(client);
  };

  update = async (request: Request, response: Response) => {
    const client = await this.clientService.update(request.params.id, request.body);
    return response.json(client);
  };

  delete = async (request: Request, response: Response) => {
    await this.clientService.delete(request.params.id);
    return response.status(204).send();
  };
}
