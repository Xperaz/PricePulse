export type CountryDto = {
  name: string;
  code: string;
};

export type CountryGroupDiscountDto = {
  coupon: string;
  discountPercentage: number | undefined;
};

export type CountryGroupDto = {
  id: string;
  name: string;
  recommendedDiscountPercentage: number | null;
  countries: CountryDto[];
  discount: CountryGroupDiscountDto | undefined;
};
