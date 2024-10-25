import { ICategory } from "@/interfaces/Category.interface";
import { IPlace } from "@/interfaces/Place.interface";

export interface IItem {
  id: number;
  title: string;
  description?: string;
  image?: string;
  category: ICategory;
  place: IPlace;
};