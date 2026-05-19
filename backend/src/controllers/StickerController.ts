import { StickerType } from "@prisma/client";
import { Request, Response } from "express";
import { StickerService } from "../services/StickerService";

export class StickerController {
  constructor(private readonly stickerService = new StickerService()) {}

  listCatalog = async (_request: Request, response: Response) => {
    return response.json(this.stickerService.listCatalog());
  };

  addWanted = async (request: Request, response: Response) => {
    const item = await this.stickerService.addItem(request.params.collectorId, request.body, StickerType.WANTED);
    return response.status(201).json(item);
  };

  listWanted = async (request: Request, response: Response) => {
    const stickers = await this.stickerService.listItems(request.params.collectorId, StickerType.WANTED);
    return response.json(stickers);
  };

  removeWanted = async (request: Request, response: Response) => {
    await this.stickerService.removeItem(request.params.collectorId, request.params.stickerCode, StickerType.WANTED);
    return response.status(204).send();
  };

  addDuplicate = async (request: Request, response: Response) => {
    const item = await this.stickerService.addItem(request.params.collectorId, request.body, StickerType.DUPLICATE);
    return response.status(201).json(item);
  };

  listDuplicates = async (request: Request, response: Response) => {
    const stickers = await this.stickerService.listItems(request.params.collectorId, StickerType.DUPLICATE);
    return response.json(stickers);
  };

  removeDuplicate = async (request: Request, response: Response) => {
    await this.stickerService.removeItem(request.params.collectorId, request.params.stickerCode, StickerType.DUPLICATE);
    return response.status(204).send();
  };
}
