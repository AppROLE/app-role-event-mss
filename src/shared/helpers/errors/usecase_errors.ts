import { BaseError } from "./base_error";

export class NoItemsFound extends BaseError {
  constructor(message: string) {
    super(`Nenhum item foi encontrado para ${message}`);
  }
}

export class DuplicatedItem extends BaseError {
  constructor(message: string) {
    super(`Item já existente para ${message}`);
  }
}

export class ForbiddenAction extends BaseError {
  constructor(message: string) {
    super(`Esta ação não é permitida para este ${message}`);
  }
}

export class ConflictItems extends BaseError {
  constructor(message: string) {
    super(`Conflict items for ${message}`);
  }
}

export class FailToSendEmail extends BaseError {
  constructor(message: string) {
    super(`Falha ao enviar o email ${message}`);
  }
}

export class FailedToAddToGallery extends BaseError {
  constructor() {
    super("Falha ao adicionar à galeria");
  }
}
