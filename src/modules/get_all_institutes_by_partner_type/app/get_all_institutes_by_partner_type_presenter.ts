import { Environments } from "src/shared/environments";
import {
  LambdaHttpRequest,
  LambdaHttpResponse,
} from "src/shared/helpers/external_interfaces/http_lambda_requests";
import { GetAllInstitutesByPartnerTypeController } from "./get_all_institutes_by_partner_type_controller";
import { GetAllInstitutesByPartnerTypeUseCase } from "./get_all_institutes_by_partner_type_usecase";

const repo = Environments.getInstituteRepo();
const usecase = new GetAllInstitutesByPartnerTypeUseCase(repo);
const controller = new GetAllInstitutesByPartnerTypeController(usecase);

export async function getAllInstitutesByPartnerTypePresenter(
  event: Record<string, any>
) {
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
  const response = await getAllInstitutesByPartnerTypePresenter(event);
  return response;
}
