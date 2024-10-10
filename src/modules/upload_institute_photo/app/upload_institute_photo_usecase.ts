import { IFileRepository } from "src/shared/domain/irepositories/file_repository_interface";
import { IInstituteRepository } from "src/shared/domain/irepositories/institute_repository_interface";
import { Environments } from "src/shared/environments";

export class UploadInstitutePhotoUseCase {
    constructor(
        private readonly instituteRepo: IInstituteRepository,
        private readonly fileRepo: IFileRepository
    ) {}

    async execute(name: string, institutePhoto: Buffer, typePhoto: string, mimetype: string) {
        const nameFormat = name.replace(/\s+/g, '-');
        const imageKey = `${nameFormat}-logo${typePhoto}`;

        await this.fileRepo.uploadEventPhoto(imageKey, institutePhoto, mimetype);

        await this.instituteRepo.updateInstitutePhoto(name, `${Environments.getEnvs().cloudFrontUrl}/${imageKey}`);
    }
}