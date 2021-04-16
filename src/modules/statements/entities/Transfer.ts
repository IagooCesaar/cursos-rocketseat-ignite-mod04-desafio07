import {
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn
} from "typeorm";

import { Statement } from './Statement'

@Entity('transfers')
export class Transfer {

  @PrimaryColumn()
  statement_out_id: string;

  @OneToOne(() => Statement, statement => statement.id)
  @JoinColumn({ name: "statement_out_id"})
  statement_out: Statement;

  @PrimaryColumn()
  statement_in_id: string;

  @OneToOne(() => Statement, statement => statement.id)
  @JoinColumn({ name: "statement_in_id"})
  statement_in: Statement;

}
