import {
  LambdaHttpRequest,
  LambdaHttpResponse,
} from "src/shared/helpers/external_interfaces/http_lambda_requests";
import { EventRepositoryMongo } from "src/shared/infra/database/repositories/event_repository_mongo";
import { PresenceRepositoryMongo } from "src/shared/infra/database/repositories/presence_repository_mongo";
import { GetTopEventsUseCase } from "./get_top_events_usecase";
import { GetTopEventsController } from "./get_top_events_controller";

const eventRepo = new EventRepositoryMongo();
const presenceRepo = new PresenceRepositoryMongo();
const usecase = new GetTopEventsUseCase(eventRepo, presenceRepo);
const controller = new GetTopEventsController(usecase);

export async function getTopEventsPresenter(event: Record<string, any>) {
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
  const response = await getTopEventsPresenter(event);
  return response;
}
