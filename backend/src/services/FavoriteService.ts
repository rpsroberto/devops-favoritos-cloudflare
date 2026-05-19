import { z } from "zod";
import { AppError } from "../middlewares/AppError";
import { ClientRepository } from "../repositories/ClientRepository";
import { FavoriteRepository } from "../repositories/FavoriteRepository";
import { FakeStoreProduct, FakeStoreService } from "./FakeStoreService";

const favoriteSchema = z.object({
  productId: z.coerce.number().int().positive("Informe um productId válido.")
});

export interface FavoriteProduct {
  id: number;
  title: string;
  image: string;
  price: number;
  rating?: FakeStoreProduct["rating"];
}

export class FavoriteService {
  constructor(
    private readonly favoriteRepository = new FavoriteRepository(),
    private readonly clientRepository = new ClientRepository(),
    private readonly fakeStoreService = new FakeStoreService()
  ) {}

  async add(clientId: string, data: { productId: number }) {
    const { productId } = favoriteSchema.parse(data);
    await this.ensureClientExists(clientId);
    await this.fakeStoreService.getProduct(productId);

    const existingFavorite = await this.favoriteRepository.findByClientAndProduct(clientId, productId);

    if (existingFavorite) {
      throw new AppError("Este produto já está nos favoritos do cliente.", 409);
    }

    return this.favoriteRepository.create(clientId, productId);
  }

  async listByClient(clientId: string): Promise<FavoriteProduct[]> {
    await this.ensureClientExists(clientId);
    const favorites = await this.favoriteRepository.findManyByClient(clientId);

    const products = await Promise.all(
      favorites.map(async (favorite) => this.fakeStoreService.getProduct(favorite.productId))
    );

    return products.map((product) => ({
      id: product.id,
      title: product.title,
      image: product.image,
      price: product.price,
      rating: product.rating
    }));
  }

  async remove(clientId: string, productIdInput: number) {
    const { productId } = favoriteSchema.parse({ productId: productIdInput });
    await this.ensureClientExists(clientId);

    const favorite = await this.favoriteRepository.findByClientAndProduct(clientId, productId);

    if (!favorite) {
      throw new AppError("Favorito não encontrado para este cliente.", 404);
    }

    await this.favoriteRepository.deleteByClientAndProduct(clientId, productId);
  }

  private async ensureClientExists(clientId: string) {
    const client = await this.clientRepository.findById(clientId);

    if (!client) {
      throw new AppError("Cliente não encontrado.", 404);
    }
  }
}
