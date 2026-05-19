import { AppError } from "../middlewares/AppError";
import { fakeStoreFallbackProducts } from "./fakeStoreFallback";

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
    try {
      const response = await fetch(`${this.baseUrl}/products`);

      if (!response.ok) {
        return fakeStoreFallbackProducts;
      }

      return response.json() as Promise<FakeStoreProduct[]>;
    } catch {
      return fakeStoreFallbackProducts;
    }
  }

  async getProduct(productId: number): Promise<FakeStoreProduct> {
    try {
      const response = await fetch(`${this.baseUrl}/products/${productId}`);

      if (response.status === 404) {
        throw new AppError("Produto não encontrado na Fake Store API.", 404);
      }

      if (!response.ok) {
        return this.getFallbackProduct(productId);
      }

      const product = (await response.json()) as FakeStoreProduct | null;

      if (!product || !product.id) {
        throw new AppError("Produto não encontrado na Fake Store API.", 404);
      }

      return product;
    } catch (error) {
      if (error instanceof AppError && error.statusCode === 404) {
        throw error;
      }

      return this.getFallbackProduct(productId);
    }
  }

  private getFallbackProduct(productId: number) {
    const product = fakeStoreFallbackProducts.find((fallbackProduct) => fallbackProduct.id === productId);

    if (!product) {
      throw new AppError("Produto não encontrado na Fake Store API.", 404);
    }

    return product;
  }
}
