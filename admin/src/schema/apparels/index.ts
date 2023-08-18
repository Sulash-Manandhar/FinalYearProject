import { Binary } from "..";

export interface ApparelDetail {
  id: number;
  name: string;
  category: string;
  price: number;
  color: string;
  large_size: number;
  small_size: number;
  medium_size: number;
  description: string;
  imagePath: string;
  is_featured: Binary;
}
