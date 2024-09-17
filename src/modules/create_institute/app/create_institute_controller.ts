import { IRequest, IResponse } from "src/shared/helpers/external_interfaces/external_interface";
import { CreateInstituteUseCase } from "./create_institute_usecase";
import { INSTITUTE_TYPE } from "src/shared/domain/enums/institute_type_enum";
import { MissingParameters, WrongTypeParameters } from "src/shared/helpers/errors/controller_errors";
import { CreateInstituteViewModel } from "./create_institute_viewmodel";
import { BadRequest, InternalServerError } from "src/shared/helpers/external_interfaces/http_codes";
import { EntityError } from "src/shared/helpers/errors/domain_errors";

export class CreateInstituteController {
    constructor(private readonly usecase: CreateInstituteUseCase) {}

    async handle(req: IRequest) {
        try {
            const {
                description,
                institute_type,
                logo_photo,
                name,
                address,
                district_id,
                price
            } = req.data;

            const requiredParams = [
                "description",
                "institute_type",
                "logo_photo",
                "name",
                "address",
                "district_id",
                "price"
            ];

            for (const param of requiredParams) {
                if (req.data[param] === undefined) {
                    throw new MissingParameters(param);
                }
            }

            if (typeof description !== "string") {
                throw new WrongTypeParameters("description", "string", typeof description);
            }
            if (typeof institute_type !== "string") {
                throw new WrongTypeParameters("institute_type", "string", typeof institute_type);
            }
            if (typeof logo_photo !== "string") {
                throw new WrongTypeParameters("logo_photo", "string", typeof logo_photo);
            }
            if (typeof name !== "string") {
                throw new WrongTypeParameters("name", "string", typeof name);
            }
            if (typeof address !== "string") {
                throw new WrongTypeParameters("address", "string", typeof address);
            }
            if (typeof district_id !== "string") {
                throw new WrongTypeParameters("district_id", "string", typeof district_id);
            }
            if (typeof price !== "number") {
                throw new WrongTypeParameters("price", "number", typeof price);
            }

            await this.usecase.execute({
                description: description,
                institute_type: INSTITUTE_TYPE[institute_type as keyof typeof INSTITUTE_TYPE],
                logo_photo: logo_photo,
                name: name,
                address: address,
                district_id: district_id,
                price: price,
            })

            const viewmodel = new CreateInstituteViewModel("Instituição criada com sucesso");
            return viewmodel.toJSON();
        } catch (error) {
            if (
                error instanceof MissingParameters ||
                error instanceof WrongTypeParameters
            ) {
                return new BadRequest(error.message);
            }
            if (error instanceof EntityError) {
                return new BadRequest(error.message);
            }
            if (error instanceof Error) {
                return new InternalServerError(
                `CreateEventController, Error on handle: ${error.message}`
                );
            }
        }
    }
}