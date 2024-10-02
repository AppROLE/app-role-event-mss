import { Environments } from "src/shared/environments";
import {
  LambdaHttpRequest,
  LambdaHttpResponse,
} from "src/shared/helpers/external_interfaces/http_lambda_requests";
import { DeleteInstituteByIdUseCase } from "./delete_institute_by_id_usecase";
import { DeleteInstituteByIdController } from "./delete_institute_by_id_controller";

const repo = Environments.getInstituteRepo();
const usecase = new DeleteInstituteByIdUseCase(repo);
const controller = new DeleteInstituteByIdController(usecase);

export async function deleteInstituteByIdPresenter(event: Record<string, any>) {
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
  const response = await deleteInstituteByIdPresenter(event);
  return response;
}
