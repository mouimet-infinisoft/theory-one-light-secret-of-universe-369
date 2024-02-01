import { IAi } from '../ai/abstraction';

export class Awareness {
  public perception: string[];

  constructor(private llmInterface: IAi) {
    this.perception = [];

    this.perception.push(`
        It is currently: ${new Date().toUTCString()}
        I am located in Montreal
        `);
  }

  public async processInput(input: string): Promise<string> {
    const prompt = `  
    ${this.perception}
        Analyze and describe the initial context and sentiment of the following input: ${input}`;
    const awarenessOutput = await this.llmInterface.ask(prompt);
    return awarenessOutput;
  }
}
