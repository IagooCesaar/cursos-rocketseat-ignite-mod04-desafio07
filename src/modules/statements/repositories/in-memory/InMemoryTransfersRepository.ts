import { Transfer } from "../../entities/Transfer";
import { ITransfersRepository } from "../ITransfersRepository";

class InMemoryTransferRepository implements ITransfersRepository {
  private transfers: Transfer[] = []

  async create(statement_out_id: string, statement_in_id: string): Promise<void> {
    const transfer = new Transfer();
    Object.assign(transfer, {
      statement_in_id,
      statement_out_id
    })
    this.transfers.push(transfer)
  }

}

export { InMemoryTransferRepository }
