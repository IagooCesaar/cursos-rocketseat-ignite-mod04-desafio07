import { isConstructorDeclaration } from "typescript";
import { Statement } from "../entities/Statement";

export class BalanceMap {
  static toDTO({statement, balance}: { statement: Statement[], balance: number}) {
    console.log('received data', statement)

    const parsedStatement = statement.map(({
      id,
      amount,
      description,
      type,
      created_at,
      updated_at,
    }) => {
      const statementView = {
        id,
        amount: Number(amount),
        description,
        type,
        created_at,
        updated_at
      }

      // if(type==='transfer_in') console.log(transferIn, transferOut)

      // if(type==='transfer_in' && transferIn) {
      //   Object.assign(statementView, {
      //     sender_id: transferIn.statementOut.user_id
      //   })
      // }

      // if(type==='transfer_out' && transferOut) {
      //   Object.assign(statementView, {
      //     receiver_id: transferOut.statementIn.user_id
      //   })
      // }

      return statementView;
    });

    return {
      statement: parsedStatement,
      balance: Number(balance)
    }
  }
}
