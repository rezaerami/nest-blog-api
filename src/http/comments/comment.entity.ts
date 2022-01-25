import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../users/user.entity';
import { PostEntity } from '../posts/post.entity';

@Entity('comments')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  userId: number;
  @ManyToOne(() => UserEntity, (user) => user.comments)
  public user: UserEntity;

  @Column()
  postId: number;
  @ManyToOne(() => PostEntity, (post) => post.comments)
  public post: PostEntity;
}
