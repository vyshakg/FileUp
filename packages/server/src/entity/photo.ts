import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Photo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  photoId: string;

  @Column()
  size: number;

  @CreateDateColumn()
  uploadedDate: Date;

  @Column({ nullable: true })
  favouritePhotos: boolean;

  @ManyToOne(type => User, user => user.photos)
  uploadedUser: User;
}
