import {
  LambdaHttpRequest,
  LambdaHttpResponse,
} from "src/shared/helpers/external_interfaces/http_lambda_requests";
import { EventRepositoryMongo } from "src/shared/infra/database/repositories/event_repository_mongo";
import { PresenceRepositoryMongo } from "src/shared/infra/database/repositories/presence_repository_mongo";
import { GetTopEventsUseCase } from "./get_top_events_usecase";
import { GetTopEventsController } from "./get_top_events_controller";

console.log("Loading FUNCTIONNN");
const eventRepo = new EventRepositoryMongo();
const presenceRepo = new PresenceRepositoryMongo();
console.log('TEMOS os dois repos')
const usecase = new GetTopEventsUseCase(eventRepo, presenceRepo);
console.log('TEMOS usecase')
const controller = new GetTopEventsController(usecase);
console.log('TEMOS controller')

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
