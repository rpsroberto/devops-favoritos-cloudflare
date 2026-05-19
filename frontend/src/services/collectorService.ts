import { Collector, CollectorPayload } from "../types/collector";
import { apiRequest } from "./api";

export const collectorService = {
  list: () => apiRequest<Collector[]>("/collectors"),
  create: (payload: CollectorPayload) =>
    apiRequest<Collector>("/collectors", {
      method: "POST",
      body: JSON.stringify(payload)
    }),
  update: (id: string, payload: CollectorPayload) =>
    apiRequest<Collector>(`/collectors/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload)
    }),
  remove: (id: string) =>
    apiRequest<void>(`/collectors/${id}`, {
      method: "DELETE"
    })
};
