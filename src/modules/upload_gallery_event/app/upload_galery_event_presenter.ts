import { Environments } from "src/shared/environments";
import { UploadGalleryEventUseCase } from "./upload_galery_event_usecase";
import { UploadGalleryEventController } from "./upload_galery_event_controller";
import { parseMultipartFormData } from "src/shared/helpers/functions/export_busboy";
import { LambdaHttpRequest, LambdaHttpResponse } from "src/shared/helpers/external_interfaces/http_lambda_requests";

const repo = Environments.getEventRepo()
const fileRepo = Environments.getFileRepo()
const usecase = new UploadGalleryEventUseCase(repo, fileRepo);
const controller = new UploadGalleryEventController(usecase);

export async function uploadGalleryEvent(event: Record<string, any>){
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
    const response = await uploadGalleryEvent(event);
    return response;
}