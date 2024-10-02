import { Institute } from "src/shared/domain/entities/institute";

export class GetInstituteByIdViewModel {
    private institute_id: string;
    private name: string;
    private logo_photo: string;
    private events_id: string[];

    constructor(institute: Institute) {
        this.institute_id = institute.instituteId ?? ''
        this.name = institute.instituteName
        this.logo_photo = institute.instituteLogoPhoto ?? ''
        this.events_id = institute.instituteEventsId ?? ['']
    }

    toJSON() {
        return {
            institute_id: this.institute_id,
            name: this.name,
            logo_photo: this.logo_photo,
            events_id: this.events_id
        }
    }
}