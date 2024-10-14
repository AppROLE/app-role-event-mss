import { Environments } from "src/shared/environments";
import {
  LambdaHttpRequest,
  LambdaHttpResponse,
} from "src/shared/helpers/external_interfaces/http_lambda_requests";
import { CreateDistrictController } from "./create_district_controller";
import { CreateDistrictUseCase } from "./create_district_usecase";
import { getRequesterUser } from "src/shared/utils/get_requester_user";

const repo = Environments.getDistrictRepo();
const usecase = new CreateDistrictUseCase(repo);
const controller = new CreateDistrictController(usecase);

export async function createDistrictPresenter(
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
  const response = await createDistrictPresenter(event);
  return response;
}
