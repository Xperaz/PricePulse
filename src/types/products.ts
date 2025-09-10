export type ProductDto = {
  id: string;
  name: string;
  url: string;
  description?: string | null;
  clerkUserId?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
