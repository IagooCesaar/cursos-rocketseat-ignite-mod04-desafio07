import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { User } from '../../users/entities/User';
import { Transfer } from './Transfer';

export enum OperationType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
  TRANSFER_IN = 'transfer_in',
  TRANSFER_OUT = 'transfer_out'
}

@Entity('statements')
export class Statement {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @OneToOne(type => Transfer)
  @JoinColumn({name: 'id', referencedColumnName: "statement_in_id"})
  transferIn: Transfer;

  @OneToOne(type => Transfer)
  @JoinColumn({name: 'id', referencedColumnName: "statement_out_id"})
  transferOut: Transfer;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => User, user => user.statement)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  description: string;

  @Column('decimal', { precision: 5, scale: 2 })
  amount: number;

  @Column({ type: 'enum', enum: OperationType })
  type: OperationType;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
