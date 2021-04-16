interface IRequest {
  sender_id: string;
  receiver_id: string;
  amount: Number;
  description: string;
}

class MakeTransferenceUseCase {

  async execute({
    sender_id,
    receiver_id,
    amount,
    description
  }: IRequest): Promise<void> {

  }
}

export { MakeTransferenceUseCase }
