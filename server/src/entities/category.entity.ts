import { ICategory } from "@/interfaces/Category.interface";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'categories' })
export class Category implements ICategory {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  title!: string;

  @Column({ nullable: true })
  description?: string;
};