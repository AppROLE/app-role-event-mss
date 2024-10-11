export class GetPhraseViewModel {
    constructor(
        private readonly phrase: string,
        private readonly username: string
    ) {}
    
    toJSON() {
        return {
            phrase: `${this.phrase} ${this.username}`,
        };
    }
}