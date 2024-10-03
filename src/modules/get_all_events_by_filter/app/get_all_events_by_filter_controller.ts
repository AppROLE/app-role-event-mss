import { IRequest } from "src/shared/helpers/external_interfaces/external_interface";
import { GetEventsByFilterUseCase } from "./get_all_events_by_filter_usecase";
import { GetAllEventsByFilterViewModel } from "./get_all_events_by_filter_viewmodel";
import {
  InternalServerError,
  NotFound,
  OK,
} from "src/shared/helpers/external_interfaces/http_codes";
import { NoItemsFound } from "src/shared/helpers/errors/usecase_errors";

export class GetEventsByFilterController {
  constructor(private readonly usecase: GetEventsByFilterUseCase) {}

  async handle(req: IRequest): Promise<any> {
    try {
      const filters = req.data;

      const events = await this.usecase.execute(filters);

      const viewModel = new GetAllEventsByFilterViewModel(events);
      return new OK(viewModel.toJSON());
    } catch (error: any) {
      if (error instanceof NoItemsFound) {
        return new NotFound(error.message);
      }
      if (error instanceof Error) {
        return new InternalServerError(
          `GetEventsByFilterController, Error on handle: ${error.message}`
        );
      }
    }
  }
}
