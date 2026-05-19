import { apiRequest } from "./api";
import { Client, ClientPayload } from "../types/client";

export const clientService = {
  list: () => apiRequest<Client[]>("/clients"),
  create: (payload: ClientPayload) =>
    apiRequest<Client>("/clients", {
      method: "POST",
      body: JSON.stringify(payload)
    }),
  update: (id: string, payload: ClientPayload) =>
    apiRequest<Client>(`/clients/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload)
    }),
  remove: (id: string) =>
    apiRequest<void>(`/clients/${id}`, {
      method: "DELETE"
    })
};
