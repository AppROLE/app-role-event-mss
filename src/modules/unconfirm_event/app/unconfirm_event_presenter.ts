import { Environments } from "src/shared/environments";
import {
  LambdaHttpRequest,
  LambdaHttpResponse,
} from "src/shared/helpers/external_interfaces/http_lambda_requests";
import { UnConfirmEventController } from "./unconfirm_event_controller";
import { UnConfirmEventUseCase } from "./unconfirm_event_usecase";
import { getRequesterUser } from "src/shared/utils/get_requester_user";

const eventRepo = Environments.getEventRepo();
const presenceRepo = Environments.getPresenceRepo();
const usecase = new UnConfirmEventUseCase(eventRepo, presenceRepo);
const controller = new UnConfirmEventController(usecase);

export async function unconfirmEventPresenter(
  event: Record<string, any>
) {
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
  const response = await unconfirmEventPresenter(event);
  return response;
}