import { Environments } from "src/shared/environments";
import {
  LambdaHttpRequest,
  LambdaHttpResponse,
} from "src/shared/helpers/external_interfaces/http_lambda_requests";
import { DeleteEventPhotoUseCase } from "./delete_event_photo_usecase";
import { deleteEventPhotoController } from "./delete_event_photo_controller";

const fileRepository = Environments.getFileRepo();
const usecase = new DeleteEventPhotoUseCase(fileRepository);
const controller = new deleteEventPhotoController(usecase);

export async function deleteEventPhotoPresenter(event: Record<string, any>) {
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
  const response = await deleteEventPhotoPresenter(event);
  return response;
}
