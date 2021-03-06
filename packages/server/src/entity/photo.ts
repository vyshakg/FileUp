import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Photo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  originalFilename: string;

  @Column()
  photoId: string;

  @Column()
  size: number;

  @CreateDateColumn()
  uploadedDate: Date;

  @Column({ nullable: true, default: false })
  favouritePhoto: boolean;

  @ManyToOne(type => User, user => user.photos)
  uploadedUser: User;
}
