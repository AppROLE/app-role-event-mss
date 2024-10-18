import { Institute } from "src/shared/domain/entities/institute";
import { INSTITUTE_TYPE } from "src/shared/domain/enums/institute_type_enum";
import { PARTNER_TYPE } from "src/shared/domain/enums/partner_type_enum";
import { IInstituteRepository } from "src/shared/domain/irepositories/institute_repository_interface";

export class UpdateInstituteUseCase {
    constructor(private readonly repo: IInstituteRepository) {}

    async execute(
        institute_id: string,
        description?: string,
        institute_type?: INSTITUTE_TYPE,
        partner_type?: PARTNER_TYPE,
        name?: string,
        address?: string,
        district_id?: string,
        price?: number,
        phone?: string
    ) {
        let institute = {};

        if (institute_id) {
            institute = { ...institute, institute_id };
        }
        if (description) {
            institute = { ...institute, description };
        }
        if (institute_type) {
            institute = { ...institute, institute_type };
        }
        if (partner_type) {
            institute = { ...institute, partner_type };
        }
        if (name) {
            institute = { ...institute, name };
        }
        if (address) {
            institute = { ...institute, address };
        }
        if (district_id) {
            institute = { ...institute, district_id };
        }
        if (price) {
            institute = { ...institute, price };
        }
        if (phone) {
            institute = { ...institute, phone };
        }

        await this.repo.updateInstitute(institute as Institute);

    }
}