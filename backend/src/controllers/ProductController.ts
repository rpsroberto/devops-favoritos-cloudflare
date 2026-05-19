import { Request, Response } from "express";
import { FakeStoreService } from "../services/FakeStoreService";

export class ProductController {
  constructor(private readonly fakeStoreService = new FakeStoreService()) {}

  list = async (_request: Request, response: Response) => {
    const products = await this.fakeStoreService.listProducts();
    return response.json(products);
  };
}
