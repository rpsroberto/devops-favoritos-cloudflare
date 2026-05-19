import { Request, Response } from "express";
import { CollectorService } from "../services/CollectorService";

export class CollectorController {
  constructor(private readonly collectorService = new CollectorService()) {}

  create = async (request: Request, response: Response) => {
    const collector = await this.collectorService.create(request.body);
    return response.status(201).json(collector);
  };

  list = async (_request: Request, response: Response) => {
    const collectors = await this.collectorService.list();
    return response.json(collectors);
  };

  getById = async (request: Request, response: Response) => {
    const collector = await this.collectorService.getById(request.params.id);
    return response.json(collector);
  };

  update = async (request: Request, response: Response) => {
    const collector = await this.collectorService.update(request.params.id, request.body);
    return response.json(collector);
  };

  delete = async (request: Request, response: Response) => {
    await this.collectorService.delete(request.params.id);
    return response.status(204).send();
  };
}
