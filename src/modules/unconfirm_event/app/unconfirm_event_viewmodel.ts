export class UnConfirmEventViewmodel {
  message: string;

  constructor(message: string) {
    this.message = message;
  }

  toJSON() {
    return {
      message: this.message
    }
  }
}