interface ITransfersRepository {
  create(
    statement_out_id: string,
    statement_in_id: string
  ): Promise<void>;
}

export { ITransfersRepository }
