export type ProductDto = {
  id: string;
  name: string;
  url: string;
  clerkUserId: string;
  description?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
};

export type ProductCustomizationDto = {
  id: string;
  classPrefix: string | null;
  productId: string;
  locationMessage: string;
  backgroundColor: string;
  textColor: string;
  fontSize: string;
  bannerContainer: string;
  isSticky: boolean;
  updatedAt: Date;
  createdAt: Date;
};
