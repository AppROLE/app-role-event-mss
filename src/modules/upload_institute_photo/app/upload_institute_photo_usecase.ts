import { IFileRepository } from "src/shared/domain/irepositories/file_repository_interface";
import { IInstituteRepository } from "src/shared/domain/irepositories/institute_repository_interface";
import { Environments } from "src/shared/environments";

export class UploadInstitutePhotoUseCase {
    constructor(
        private readonly instituteRepo: IInstituteRepository,
        private readonly fileRepo: IFileRepository
    ) {}

    async execute(name: string, institutePhoto: Buffer, mimetype: string) {
        const imageKey = `${name}-logo`;

        await this.fileRepo.uploadInstitutePhoto(imageKey, institutePhoto, mimetype);

        await this.instituteRepo.updateInstitutePhoto(name, `${Environments.getEnvs().cloudFrontUrl}/${imageKey}`);
    }
}