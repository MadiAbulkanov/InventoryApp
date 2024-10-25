import { Category } from "@/entities/category.entity";
import { Place } from "@/entities/place.entity";
import { IItem } from "@/interfaces/Item.interface";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'items' })
export class Item implements IItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  image?: string;

  @Column({ nullable: true })
  categoryId!: number;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'categoryId' })
  category!: Category;

  @Column({ nullable: true })
  placeId!: number;

  @ManyToOne(() => Place)
  @JoinColumn({ name: 'placeId' })
  place!: Place;
};