import { Expose } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CategoryDto {
    @IsNotEmpty({ message: 'Category can not be created without title!' })
    @IsString({ message: 'Title of the category must be a string' })
    @Expose() title!: string;
  
    @IsOptional()
    @Expose() description?: string;
};