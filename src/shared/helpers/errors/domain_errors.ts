import { BaseError } from "./base_error";

export class EntityError extends BaseError {
  constructor(message: string) {
    super(`O campo ${message} não é válido.`);
  }
}

export class EnumError extends BaseError {
  constructor() {
    super("Invalid enum value");
  }
}
