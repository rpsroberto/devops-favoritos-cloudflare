import { Request, Response } from "express";
import { FavoriteService } from "../services/FavoriteService";

export class FavoriteController {
  constructor(private readonly favoriteService = new FavoriteService()) {}

  add = async (request: Request, response: Response) => {
    const favorite = await this.favoriteService.add(request.params.clientId, request.body);
    return response.status(201).json(favorite);
  };

  listByClient = async (request: Request, response: Response) => {
    const favorites = await this.favoriteService.listByClient(request.params.clientId);
    return response.json(favorites);
  };

  remove = async (request: Request, response: Response) => {
    await this.favoriteService.remove(request.params.clientId, Number(request.params.productId));
    return response.status(204).send();
  };
}
