import { IEventRepository } from "src/shared/domain/irepositories/event_repository_interface";
import { IFileRepository } from "src/shared/domain/irepositories/file_repository_interface";
import { IInstituteRepository } from "src/shared/domain/irepositories/institute_repository_interface";
import { NoItemsFound } from "src/shared/helpers/errors/usecase_errors";

export class DeleteInstituteByIdUseCase {
  constructor(
    private readonly instituteRepository: IInstituteRepository,
    private readonly eventRepository: IEventRepository,
    private readonly fileRepository: IFileRepository
  ) {}

  async execute(instituteId: string): Promise<void> {
    const institute = await this.instituteRepository.getInstituteById(
      instituteId
    );
    if (!institute) {
      throw new NoItemsFound("institute");
    }

    console.log('INSTITUTO: ', institute);
    console.log('ARRAY: ', institute.instituteEventsId);

    if (institute.instituteEventsId) {
      for (const eventId of institute.instituteEventsId) {
        console.log("AQUI CACETEEEEEEEEEEE PORRA ", eventId);
        await this.eventRepository.deleteEventById(eventId);
      }
    }
    if(institute.instituteLogoPhoto !== ''){
      await this.fileRepository.deleteInstitutePhoto(institute.instituteName);
    }

    await this.instituteRepository.deleteInstituteById(instituteId);
  }
}
