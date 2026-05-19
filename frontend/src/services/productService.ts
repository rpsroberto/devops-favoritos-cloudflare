import { apiRequest } from "./api";
import { Product } from "../types/product";

export const productService = {
  list: () => apiRequest<Product[]>("/products"),
  listFavorites: (clientId: string) => apiRequest<Product[]>(`/clients/${clientId}/favorites`),
  addFavorite: (clientId: string, productId: number) =>
    apiRequest<void>(`/clients/${clientId}/favorites`, {
      method: "POST",
      body: JSON.stringify({ productId })
    }),
  removeFavorite: (clientId: string, productId: number) =>
    apiRequest<void>(`/clients/${clientId}/favorites/${productId}`, {
      method: "DELETE"
    })
};
