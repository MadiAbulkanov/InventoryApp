import { Expose } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class PlaceDto {
    @IsNotEmpty({ message: 'Place can not be created without title!' })
    @IsString({ message: 'Title of the place must be a string' })
    @Expose() title!: string;
  
    @IsOptional()
    @Expose() description?: string;
};