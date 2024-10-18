import { IRequest } from "src/shared/helpers/external_interfaces/external_interface";
import { UpdateInstituteUseCase } from "./update_institute_usecase";
import { BadRequest, InternalServerError, NotFound, OK } from "src/shared/helpers/external_interfaces/http_codes";
import { MissingParameters, WrongTypeParameters } from "src/shared/helpers/errors/controller_errors";
import { INSTITUTE_TYPE } from "src/shared/domain/enums/institute_type_enum";
import { PARTNER_TYPE } from "src/shared/domain/enums/partner_type_enum";
import { UpdateInstituteViewModel } from "./update_institute_viewmodel";
import { EntityError } from "src/shared/helpers/errors/domain_errors";
import { NoItemsFound } from "src/shared/helpers/errors/usecase_errors";

export class UpdateInstituteController {
    constructor(private readonly usecase: UpdateInstituteUseCase) {}

    async handle(req: IRequest) {
        try {
            const {
                institute_id,
                description,
                institute_type,
                partner_type,
                name,
                address,
                district_id,
                price,
                phone,
            } = req.data;

            const requiredParams = [
                "institute_id"
            ];

            for (const param of requiredParams) {
                if (req.data[param] === undefined) {
                    throw new MissingParameters(param);
                }
            }

            if (typeof institute_id !== "string") {
                throw new WrongTypeParameters("institute_id", "string", typeof institute_id);
            }
            if (typeof description !== "string") {
                throw new WrongTypeParameters(
                    "description",
                    "string",
                    typeof description
                );
            }
            if (typeof institute_type !== "string") {
                throw new WrongTypeParameters(
                    "institute_type",
                    "string",
                    typeof institute_type
                );
            }
            if (typeof partner_type !== "string") {
                throw new WrongTypeParameters(
                    "partner_type",
                    "string",
                    typeof partner_type
                );
            }
            if (typeof name !== "string") {
                throw new WrongTypeParameters("name", "string", typeof name);
            }
    
            if (address !== undefined) {
                if (typeof address !== "string") {
                    throw new WrongTypeParameters("address", "string", typeof address);
                }
            }
            if (district_id !== undefined) {
                if (typeof district_id !== "string") {
                    throw new WrongTypeParameters(
                    "district_id",
                    "string",
                    typeof district_id
                    );
                }
            }
            if (price !== undefined) {
                if (typeof price !== "number") {
                    throw new WrongTypeParameters("price", "number", typeof price);
                }
            }
            if (phone !== undefined) {
                if (typeof phone !== "string") {
                    throw new WrongTypeParameters("phone", "string", typeof phone);
                }
            }

            await this.usecase.execute(
                institute_id,
                description,
                INSTITUTE_TYPE[institute_type as keyof typeof INSTITUTE_TYPE],
                PARTNER_TYPE[partner_type as keyof typeof PARTNER_TYPE],
                name,
                address,
                district_id,
                price,
                phone
            );

            const viewmodel = new UpdateInstituteViewModel("Instituto atualizado com sucesso");

            return new OK(viewmodel.toJSON());
        } catch (error: any) {
            if (
                error instanceof MissingParameters ||
                error instanceof WrongTypeParameters
            ) {
            return new BadRequest(error.message);
            }
            if (error instanceof EntityError) {
            return new BadRequest(error.message);
            }
            if (error instanceof NoItemsFound) {
            return new NoItemsFound(error.message);
            }
            return new InternalServerError(`CreateEventController, Error on handle: ${error.message}`);
        }
    }
}