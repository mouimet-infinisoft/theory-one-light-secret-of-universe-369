import { IAi } from "../ai/abstraction";

export class Awareness {
    constructor(private llmInterface: IAi) {}

    public async processInput(input: string): Promise<string> {
        const prompt = `
        It is currently: ${new Date().toUTCString()}
        I am located in Montreal
        
        Analyze and describe the initial context and sentiment of the following input: ${input}`;
        const awarenessOutput = await this.llmInterface.ask(prompt);
        return awarenessOutput;
    }
}
