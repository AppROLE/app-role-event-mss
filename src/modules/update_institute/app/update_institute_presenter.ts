import { Environments } from "src/shared/environments";
import {
  LambdaHttpRequest,
  LambdaHttpResponse,
} from "src/shared/helpers/external_interfaces/http_lambda_requests";
import { UpdateInstituteUseCase } from "./update_institute_usecase";
import { UpdateInstituteController } from "./update_institute_controller";

const repo = Environments.getInstituteRepo();
const usecase = new UpdateInstituteUseCase(repo);
const controller = new UpdateInstituteController(usecase);

export async function updateInstitutePresenter(event: Record<string, any>) {
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
  const response = await updateInstitutePresenter(event);
  return response;
}
