
import { Institute } from "../entities/institute";
import { INSTITUTE_TYPE } from "../enums/institute_type_enum";

export class InstituteMock {
  public institutes: Institute[];

  constructor() {
    this.institutes = [
      new Institute({
        name: "Galleria Club",
        description: "A melhor balada de São Paulo",
        institute_type: INSTITUTE_TYPE.ESTABELECIMENTO_FIXO,
        logo_photo: "https://example.com/galleria_club_logo.jpg",
      }),
      new Institute({
        name: "Galleria Club",
        description: "A melhor balada de São Paulo",
        institute_type: INSTITUTE_TYPE.AGENCIA_DE_FESTAS,
        logo_photo: "https://example.com/galleria_club_logo.jpg",
      }),
      new Institute({
        name: "Galleria Club",
        description: "A melhor balada de São Paulo",
        institute_type: INSTITUTE_TYPE.ESTABELECIMENTO_FIXO,
        logo_photo: "https://example.com/galleria_club_logo.jpg",
      }),
    ];
  }
}
