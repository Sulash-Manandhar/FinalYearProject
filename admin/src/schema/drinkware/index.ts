export interface DrinkwareDetail {
  id: number;
  name: string;
  color: string;
  description: string;
  price: number;
  imagePath: string;
}

export type DrinkwareFormDetail = Omit<DrinkwareDetail, "id">;
