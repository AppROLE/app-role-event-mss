import { IRequest } from "src/shared/helpers/external_interfaces/external_interface";
import { GetPhraseUseCase } from "./get_phrase_usecase";
import {
  InternalServerError,
  NotFound,
  OK,
} from "src/shared/helpers/external_interfaces/http_codes";
import { NoItemsFound } from "src/shared/helpers/errors/usecase_errors";

export class GetPhraseController {
  constructor(private readonly usecase: GetPhraseUseCase) {}

  async handle(req: IRequest): Promise<any> {
    try {
      const phrase = await this.usecase.execute();
      return new OK(phrase);
    } catch (error: any) {
      if (error instanceof NoItemsFound) {
        return new NotFound(error.message);
      }
      if (error instanceof Error) {
        return new InternalServerError(
          `CreateEventController, Error on handle: ${error.message}`
        );
      }
    }
  }
}
