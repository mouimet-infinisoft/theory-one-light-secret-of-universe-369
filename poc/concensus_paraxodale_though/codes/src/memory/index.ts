import { IAi } from "../ai/abstraction";

export class Memory {
    private storedExperiences: Map<string, { content: string, keywords: string[] }>;
    private stopWords: Set<string>;
    private ai: IAi;

    constructor(ai: IAi) {
        this.storedExperiences = new Map();
        this.stopWords = new Set(["the", "and", "a", "to", "is", "in", "it", "you", "of", "for", "on", "with", "as", "this", "that", "these", "those", "at", "by", "an", "be", "are", "from", "was", "were", "or", "but", "we", "our", "have", "had", "has"]);
        this.ai = ai;
    }

    // Store information with a key generated by LLM
    public async storeInformation(text: string): Promise<string> {
        const key = await this.generateKey(text);
        const keywords = this.extractKeywords(text);
        this.storedExperiences.set(key, { content: text, keywords });
        return key; // Return the LLM generated key for reference
    }

    private async generateKey(text: string): Promise<string> {
        // Ask LLM to generate a summary or key phrase
        const keyPrompt = `Generate a concise key phrase or summary for the following text: ${text}`;
        const key = await this.ai.ask(keyPrompt);
        return key;
    }

    private extractKeywords(text: string): string[] {
        const tokens = text.toLowerCase().split(/\s+/);
        const filteredTokens = tokens.filter(token => !this.stopWords.has(token) && token.length > 1);
        return Array.from(new Set(filteredTokens));
    }

    // Retrieve information by the LLM-generated key
    public async retrieveInformation(key: string): Promise<string> {
        const experience = this.storedExperiences.get(key);
        if (!experience) {
            return "You tried to retrieve information form your memory seeking for related past events or information but there is nothing you can related at the moment fduring this though you are having now.";
        }
        const prompt = this.createPrompt(experience.content, experience.keywords);
        const processedMemory = await this.ai.ask(prompt);
        // console.log("Retrieved and Processed Memory by LLM: ", processedMemory);
        return processedMemory;
    }

    private createPrompt(info: string, keywords: string[]): string {
        const keywordsString = keywords.join(", ");
        return `Recall and relate past experiences or knowledge that connect to the following context: ${info}. Key topics: ${keywordsString}`;
    }
}
