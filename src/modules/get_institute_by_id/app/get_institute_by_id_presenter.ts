import { Environments } from "src/shared/environments";
import {
  LambdaHttpRequest,
  LambdaHttpResponse,
} from "src/shared/helpers/external_interfaces/http_lambda_requests";
import { GetInstituteByIdUseCase } from "./get_institute_by_id_usecase";
import { GetInstituteByIdController } from "./get_institute_by_id_controller";

const repo = Environments.getInstituteRepo();
const usecase = new GetInstituteByIdUseCase(repo);
const controller = new GetInstituteByIdController(usecase);

export async function getInstituteByIdPresenter(event: Record<string, any>) {
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
    const response = await getInstituteByIdPresenter(event);
    return response;
  }