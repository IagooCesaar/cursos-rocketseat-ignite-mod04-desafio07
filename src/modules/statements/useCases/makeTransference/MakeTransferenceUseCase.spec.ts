import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { OperationType } from "../../entities/Statement";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { StatementsRepository } from "../../repositories/StatementsRepository";
import { MakeTransferenceUseCase } from "./MakeTransferenceUseCase";

let makeTransferenceUseCase: MakeTransferenceUseCase;
let statementsRepository: InMemoryStatementsRepository;
let usersRepository: InMemoryUsersRepository;

const mockUser1 = {
  name: "Fred Ortiz",
  email: "fred.ortiz@jepso.ki",
  password: "123",
};

const mockUser2 = {
  name: "Rebecca Phelps",
  email: "rebecca.phelps@naduw.cx",
  password: "123",
};

describe("MakeTransferenceUseCase", () => {
  beforeEach(() => {
    statementsRepository = new InMemoryStatementsRepository();
    usersRepository = new InMemoryUsersRepository();
    makeTransferenceUseCase = new MakeTransferenceUseCase(
      statementsRepository,
      usersRepository
    );
  });

  it("Should be able to make a transference between two existents users", async () => {
    const user1 = await usersRepository.create(mockUser1);
    const user2 = await usersRepository.create(mockUser2);

    await statementsRepository.create({
      amount: 10,
      description: "Founds",
      type: OperationType.DEPOSIT,
      user_id: user1.id as string,
    });

    await makeTransferenceUseCase.execute({
      amount: 10,
      description: "Test",
      sender_id: user1.id as string,
      receiver_id: user2.id as string,
    });

    const { balance } = await statementsRepository.getUserBalance({
      user_id: user2.id as string,
      with_statement: false,
    });

    console.log(balance);

    expect(balance).toBe(10);
  });
});
