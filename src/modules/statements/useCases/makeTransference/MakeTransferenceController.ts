import { Request, Response } from "express";
import { container } from "tsyringe";
import { MakeTransferenceUseCase } from "./MakeTransferenceUseCase";

class MakeTransferenceController {

  async handle(request: Request, response: Response): Promise<Response> {

    const makeTransferenceUseCase = container.resolve(MakeTransferenceUseCase)

    return response.status(201).send();
  }
}

export { MakeTransferenceController }
