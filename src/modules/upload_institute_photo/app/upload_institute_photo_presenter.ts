import { Environments } from "src/shared/environments";
import { UploadInstitutePhotoUseCase } from "./upload_institute_photo_usecase";
import { UploadInstitutePhotoController } from "./upload_institute_photo_controller";
import { parseMultipartFormData } from "src/shared/helpers/functions/export_busboy";
import { LambdaHttpRequest, LambdaHttpResponse } from "src/shared/helpers/external_interfaces/http_lambda_requests";

const repo = Environments.getInstituteRepo()
const fileRepo = Environments.getFileRepo()
const usecase = new UploadInstitutePhotoUseCase(repo, fileRepo);
const controller = new UploadInstitutePhotoController(usecase);

export async function uploadInstitutePhoto(event: Record<string, any>){
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
    const response = await uploadInstitutePhoto(event);
    return response;
}