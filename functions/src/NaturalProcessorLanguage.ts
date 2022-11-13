export interface NaturalProcessorLanguage {
    detectIntent(text: string, sessionId?: string): Promise<string>;
    getMedia(): string;
}
