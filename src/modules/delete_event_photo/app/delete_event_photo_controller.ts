import {
  InternalServerError,
  OK,
} from "src/shared/helpers/external_interfaces/http_codes";
import { IRequest } from "src/shared/helpers/external_interfaces/external_interface";
import { DeleteEventPhotoUseCase } from "./delete_event_photo_usecase";
import { DeleteInstituteByIdViewModel } from "src/modules/delete_institute_by_id/app/delete_institute_by_id_viewmodel";

export class deleteEventPhotoController {
  constructor(private readonly usecase: DeleteEventPhotoUseCase) {}

  async handle(req: IRequest): Promise<any> {
    try {
      const { filename } = req.data;
      await this.usecase.execute(filename as string);
      const viewmodel = new DeleteInstituteByIdViewModel(
        "Foto do evento deletada com sucesso"
      );
      return new OK(viewmodel.toJSON());
    } catch (error: any) {
      if (error instanceof Error) {
        return new InternalServerError(
          `DeleteInstituteByIdController, Error on handle: ${error.message}`
        );
      }
    }
  }
}
