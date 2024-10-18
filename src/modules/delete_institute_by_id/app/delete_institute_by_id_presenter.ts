import { Environments } from "src/shared/environments";
import {
  LambdaHttpRequest,
  LambdaHttpResponse,
} from "src/shared/helpers/external_interfaces/http_lambda_requests";
import { DeleteInstituteByIdUseCase } from "./delete_institute_by_id_usecase";
import { DeleteInstituteByIdController } from "./delete_institute_by_id_controller";

const instituteRepository = Environments.getInstituteRepo();
const eventRepository = Environments.getEventRepo();
const fileRepository = Environments.getFileRepo();
const usecase = new DeleteInstituteByIdUseCase(instituteRepository, eventRepository, fileRepository);
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
