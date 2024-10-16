import { Environments } from "src/shared/environments";
import {
  LambdaHttpRequest,
  LambdaHttpResponse,
} from "src/shared/helpers/external_interfaces/http_lambda_requests";
import { GetDistrictByIdController } from "./get_district_by_id_controller";
import { GetDistrictByIdUseCase } from "./get_district_by_id_usecase";
import { getRequesterUser } from "src/shared/utils/get_requester_user";

const repo = Environments.getDistrictRepo();
const usecase = new GetDistrictByIdUseCase(repo);
const controller = new GetDistrictByIdController(usecase);

export async function getDistrictByIdPresenter(
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
  const response = await getDistrictByIdPresenter(event);
  return response;
}
