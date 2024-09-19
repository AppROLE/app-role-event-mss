import { Institute } from "src/shared/domain/entities/institute";
import { IInstituteRepository } from "src/shared/domain/irepositories/institute_repository_interface";

export interface CreateInstituteParams {
    name: string;
    logo_photo?: string;
    description: string;
    institute_type: string;
    address?: string;
    price?: number;
    district_id?: string;
    photos_url?: string[];
}

export class CreateInstituteUseCase {
    constructor(private repo: IInstituteRepository) {}
    
    async execute(params: CreateInstituteParams): Promise<Institute> {
        const institute = new Institute({
            name: params.name,
            description: params.description,
            institute_type: params.institute_type,
            address: params.address,
            logo_photo: params.logo_photo || "",
            district_id: params.district_id || "",
            photos_url: params.photos_url || [],
            price: params.price || 0,
        });
    
        const savedInstitute = await this.repo.createInstitute(institute);
        
        return savedInstitute;
    }
}