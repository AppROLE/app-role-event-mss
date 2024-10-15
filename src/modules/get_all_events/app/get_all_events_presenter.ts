import { Environments } from "src/shared/environments";
import {
  LambdaHttpRequest,
  LambdaHttpResponse,
} from "src/shared/helpers/external_interfaces/http_lambda_requests";
import { GetAllEventsUseCase } from "./get_all_events_usecase";
import { GetAllEventsController } from "./get_all_events_controller";

const repo = Environments.getEventRepo();
const usecase = new GetAllEventsUseCase(repo);
const controller = new GetAllEventsController(usecase);

export async function getAllEventsPresenter(event: Record<string, any>) {
  const httpRequest = new LambdaHttpRequest(event);
  const response = await controller.handle(httpRequest);
  const httpResponse = new LambdaHttpResponse(
    response?.body,
    response?.statusCode,
    response?.headers
  );

  return httpResponse.toJSON();
}

export async function lambda_handler(event: any, context: any) {
  const response = await getAllEventsPresenter(event);
  return response;
}


