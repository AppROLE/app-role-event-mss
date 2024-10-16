import { Environments } from "src/shared/environments";
import {
  LambdaHttpRequest,
  LambdaHttpResponse,
} from "src/shared/helpers/external_interfaces/http_lambda_requests";
import { GetAllConfirmedEventsUseCase } from "./get_all_confirmed_event_usecase";
import { GetAllConfirmedEventsController } from "./get_all_confirmed_event_controller";
import { getRequesterUser } from "src/shared/utils/get_requester_user";

const eventRepo = Environments.getEventRepo();
const usecase = new GetAllConfirmedEventsUseCase(eventRepo);
const controller = new GetAllConfirmedEventsController(usecase);

export async function confirmEventPresenter(event: Record<string, any>) {  
  const requesterUser = getRequesterUser(event);
  const httpRequest = new LambdaHttpRequest(event);
  const response = await controller.handle(httpRequest, requesterUser);
  const httpResponse = new LambdaHttpResponse(
    response?.body,
    response?.statusCode,
    response?.headers
  );

  return httpResponse.toJSON();
}
  
  export async function lambda_handler(event: any, context: any) {
    const response = await confirmEventPresenter(event);
    return response;
  }