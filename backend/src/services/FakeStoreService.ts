import { AppError } from "../middlewares/AppError";

export interface FakeStoreProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}

export class FakeStoreService {
  private readonly baseUrl = process.env.FAKE_STORE_API_URL ?? "https://fakestoreapi.com";

  async listProducts(): Promise<FakeStoreProduct[]> {
    const response = await fetch(`${this.baseUrl}/products`);

    if (!response.ok) {
      throw new AppError("Não foi possível buscar produtos na Fake Store API.", 502);
    }

    return response.json() as Promise<FakeStoreProduct[]>;
  }

  async getProduct(productId: number): Promise<FakeStoreProduct> {
    const response = await fetch(`${this.baseUrl}/products/${productId}`);

    if (response.status === 404) {
      throw new AppError("Produto não encontrado na Fake Store API.", 404);
    }

    if (!response.ok) {
      throw new AppError("Não foi possível validar o produto na Fake Store API.", 502);
    }

    const product = (await response.json()) as FakeStoreProduct | null;

    if (!product || !product.id) {
      throw new AppError("Produto não encontrado na Fake Store API.", 404);
    }

    return product;
  }
}
