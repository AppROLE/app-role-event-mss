import { Environments } from "src/shared/environments";
import {
  LambdaHttpRequest,
  LambdaHttpResponse,
} from "src/shared/helpers/external_interfaces/http_lambda_requests";
import { parseMultipartFormData } from "src/shared/helpers/functions/export_busboy";
import { UploadEventPhotoUseCase } from "./upload_event_photo_usecase";
import { UploadEventPhotoController } from "./upload_event_photo_controller";

const repo = Environments.getEventRepo()
const fileRepo = Environments.getFileRepo()
const usecase = new UploadEventPhotoUseCase(repo, fileRepo);
const controller = new UploadEventPhotoController(usecase);


export async function uploadEventPhoto(event: Record<string, any>) {
  const formDataParsed = await parseMultipartFormData(event);
  const httpRequest = new LambdaHttpRequest(event);
  const response = await controller.handle(httpRequest, formDataParsed);
  const httpResponse = new LambdaHttpResponse(
    response?.body,
    response?.statusCode,
    response?.headers
  );

  return httpResponse.toJSON();
}

export async function lambda_handler(event: any, context: any) {
  const response = await uploadEventPhoto(event);
  return response;
}