export interface Collector {
  id: string;
  name: string;
  email: string;
  city?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CollectorPayload {
  name: string;
  email: string;
  city?: string;
}
