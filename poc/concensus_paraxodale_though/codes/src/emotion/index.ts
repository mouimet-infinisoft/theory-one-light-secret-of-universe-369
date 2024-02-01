import { IAi } from "../ai/abstraction";

export class Emotion {
    private emotionalState: string;
    private coreValues: string[];
    private creativeIdeas: string[];

    constructor(private llmInterface: IAi) {
        this.emotionalState = "";
        this.coreValues = [];
        this.creativeIdeas = [];
    }

    // Public method to set the emotional state
    public setEmotionalState(state: string): void {
        this.emotionalState = state;
    }

    // Public method to add core values
    public addCoreValue(value: string): void {
        this.coreValues.push(value);
    }

    // Public method to add creative ideas
    public addCreativeIdea(idea: string): void {
        this.creativeIdeas.push(idea);
    }

    // Public method to integrate information and process it with LLM
    public async integrateInformation(info: string) {
        const prompt = this.createPrompt(info);
        const processedInformation = await this.llmInterface.ask(prompt);
        // console.log("Integrated and Processed Information by LLM: ", processedInformation);
        return processedInformation;
    }

    // Private method to create a prompt for the LLM
    private createPrompt(info: string): string {
        return `Integrate the given logical analysis with your emotional context, your core values, and your creative ideas to formulate insights. Information: ${info}, Your Emotional State: ${this.emotionalState}, Your Core Values: ${this.coreValues.join(", ")}, Your Creative Ideas: ${this.creativeIdeas.join(", ")}`;
    }
}

// Example usage
// const aiInterface = new AIInterface('your-api-key'); // Assuming AIInterface is already defined and imported
// const emotionComponent = new Mind(aiInterface);
// mindComponent.setEmotionalState("Curious");
// mindComponent.addCoreValue("Creativity");
// mindComponent.addCoreValue("Empathy");
// mindComponent.addCreativeIdea("Innovative learning methods");
// mindComponent.integrateInformation("Exploring new education technologies");
