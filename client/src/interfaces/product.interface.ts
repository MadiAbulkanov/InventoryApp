import { Category } from "@/interfaces/categories.interface";
import { Place } from "@/interfaces/place.interface";

export interface Product {
  id: string;
  title: string;
  description?: string;
  image?: string;
  categoryId?: string | number;
  placeId?: string | number;
  category?: Category;
  place?: Place;
}