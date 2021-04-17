import request from "supertest";
import { Connection, createConnection } from "typeorm";

import { app } from "../../../../app";
import { User } from "../../../users/entities/User";
import { Statement } from "../../entities/Statement";

let connection: Connection;

const mockUser1 = {
  name: "Fred Ortiz",
  email: "fred.ortiz@jepso.ki",
  password: "123",
};

const mockUser2 = {
  id: "",
  name: "Rebecca Phelps",
  email: "rebecca.phelps@naduw.cx",
  password: "123",
};

interface IResponseToken {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

interface IBalanceResult {
  statement: Statement[];
  balance: number;
}

let responseToken: IResponseToken;

describe("MakeTransferenceController", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    await request(app).post("/api/v1/users").send(mockUser1);

    const response = await request(app).post("/api/v1/sessions").send({
      email: mockUser1.email,
      password: mockUser1.password,
    });
    responseToken = response.body;

    await request(app).post("/api/v1/users").send(mockUser2);
  });

  afterAll(async () => {
    // await connection.dropDatabase();
    // await connection.close();
  });

  it("Should be able to make a transference between two users", async () => {
    const { token: token1 } = responseToken;
    const amount = 20;

    await request(app)
      .post("/api/v1/statements/deposit")
      .send({
        amount,
        description: "Funds",
      })
      .set({
        Authorization: `Bearer ${token1}`,
      });

    const resultToken = await request(app).post("/api/v1/sessions").send({
      email: mockUser2.email,
      password: mockUser2.password,
    });
    const { token: token2 } = resultToken.body as IResponseToken;
    const resultProfile = await request(app)
      .get("/api/v1/profile")
      .set({
        Authorization: `Bearer ${token2}`,
      });
    const { id } = resultProfile.body as User;
    mockUser2.id = id as string;
    console.log("id", mockUser2.id);

    await request(app)
      .post(`/api/v1/statements/transfers/${mockUser2.id}`)
      .send({
        amount,
        description: "Test",
      })
      .set({
        Authorization: `Bearer ${token1}`,
      });

    const statementResult = await request(app)
      .get("/api/v1/statements/balance")
      .set({
        Authorization: `Bearer ${token2}`,
      });

    const { balance, statement } = statementResult.body as IBalanceResult;
    expect(balance).toBe(amount);
    expect(statement).toHaveLength(1);
  });
});
