export type ProductDto = {
  id: string;
  name: string;
  url: string;
  clerkUserId: string;
  description?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
};
