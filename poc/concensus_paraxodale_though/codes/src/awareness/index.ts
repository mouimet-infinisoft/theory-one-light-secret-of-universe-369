import { IAi } from "../ai/abstraction";

export class Awareness {
    constructor(private llmInterface: IAi) {}

    public async processInput(input: string): Promise<string> {
        const prompt = `
        Current date & time: ${new Date().toDateString()} ${new Date().toTimeString()}        
        Analyze and describe the initial context and sentiment of the following input: ${input}`;
        const awarenessOutput = await this.llmInterface.ask(prompt);
        return awarenessOutput;
    }
}
