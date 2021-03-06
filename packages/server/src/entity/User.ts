import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Photo } from "./photo";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: "Free" })
  planType: string;

  @Column("text", { nullable: true })
  stripeId: string | null;

  @OneToMany(type => Photo, photo => photo.uploadedUser)
  photos: Photo[];
}
