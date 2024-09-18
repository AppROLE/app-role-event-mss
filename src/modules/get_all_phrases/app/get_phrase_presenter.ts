import { Environments } from "src/shared/environments";
import {
  LambdaHttpRequest,
  LambdaHttpResponse,
} from "src/shared/helpers/external_interfaces/http_lambda_requests";
import { GetPhraseUseCase } from "./get_phrase_usecase";
import { GetPhraseController } from "./get_phrase_controller";

const repo = Environments.getPhraseRepo();
const usecase = new GetPhraseUseCase(repo);
const controller = new GetPhraseController(usecase);

export async function getPhrasePresenter(event: Record<string, any>) {
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
  const response = await getPhrasePresenter(event);
  return response;
}
