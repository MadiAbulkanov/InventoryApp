import { IPlace } from "@/interfaces/Place.interface";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'places' })
export class Place implements IPlace {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  title!: string;

  @Column({ nullable: true })
  description?: string;
};