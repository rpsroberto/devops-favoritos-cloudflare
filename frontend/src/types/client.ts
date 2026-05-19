export interface Client {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface ClientPayload {
  name: string;
  email: string;
}
