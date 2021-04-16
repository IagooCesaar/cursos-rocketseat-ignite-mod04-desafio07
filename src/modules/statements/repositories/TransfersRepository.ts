import { getRepository, Repository } from "typeorm";
import { Transfer } from "../entities/Transfer";
import { ITransfersRepository } from "./ITransfersRepository";

class TransfersRepository implements ITransfersRepository {
  private repository: Repository<Transfer>;
  constructor() {
    this.repository = getRepository(Transfer)
  }

  async create(statement_out_id: string, statement_in_id: string): Promise<void> {
    const transfer = this.repository.create({
      statement_in_id,
      statement_out_id
    })
    await this.repository.save(transfer)
  }

}

export { TransfersRepository }
