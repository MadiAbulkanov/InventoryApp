import { Expose } from "class-transformer";
import { IsNotEmpty, IsNumberString, IsOptional, IsString } from "class-validator";

export class ItemDto {
    @IsNotEmpty({ message: 'Item can not be created without title!' })
    @IsString({ message: 'Title of the item must be a string' })
    @Expose() title!: string;
  
    @IsOptional()
    @Expose() description?: string;

    @IsOptional()
    @Expose() image?: string;

    @IsNotEmpty({ message: 'Category of the item is not mentioned' })
    @IsNumberString({}, { message: 'Please mentioned correct category for item' })
    @Expose()
    categoryId!: number;

    @IsNotEmpty({ message: 'Place of the item is not mentioned' })
    @IsNumberString({}, { message: 'Please mentioned correct place for item' })
    @Expose()
    placeId!: number;
};