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

  @PrimaryColumn()
  statement_in_id: string;
}
