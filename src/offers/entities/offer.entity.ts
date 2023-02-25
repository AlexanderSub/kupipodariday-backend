import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: string;

  @CreateDateColumn()
  updatedAt: string;

  @ManyToOne(() => Wish, (wish) => wish.offers)
  item: Wish[];

  @Column()
  amount: number;

  @Column()
  hidden: boolean;

  @ManyToOne(() => User, (user) => user.offers)
  user: User;
}
