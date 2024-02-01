import { IAi } from "../ai/abstraction";

export class Reasoning {
    private logicalFrameworks: string[];
    private problemSolvingStrategies: string[];

    constructor(private ai: IAi) {
        this.logicalFrameworks = [];
        this.problemSolvingStrategies = [];
    }

    // Public method to add logical frameworks
    public addLogicalFramework(framework: string): void {
        this.logicalFrameworks.push(framework);
    }

    // Public method to add problem-solving strategies
    public addProblemSolvingStrategy(strategy: string): void {
        this.problemSolvingStrategies.push(strategy);
    }

    // Public method to analyze information and make a decision
    public async analyzeAndDecide(info: string): Promise<string> {
        const prompt = this.createPrompt(info);
        const decision = await this.ai.ask(prompt);
        // console.log("Decision Made: ", decision);
        return decision;
    }

    // Private method to create a prompt for the LLM
    private createPrompt(info: string): string {
        return `Analyze the following information logically to solve the problem or make a decision. Information: ${info}, Logical Frameworks: ${this.logicalFrameworks.join(", ")}, Problem-Solving Strategies: ${this.problemSolvingStrategies.join(", ")}`;
    }
}

