import { IRequest } from "src/shared/helpers/external_interfaces/external_interface";
import { OK } from "src/shared/helpers/external_interfaces/http_codes";

export class HealthCheckController {
    async handle(req: IRequest) {
        return new OK("Health check OK");
    }
}
