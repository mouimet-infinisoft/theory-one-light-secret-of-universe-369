import { IAi } from '../ai/abstraction';

export class IntegrationOfOutcomes {
  private _customIntegrationIndications: string[];

  constructor(private llmInterface: IAi) {
    this._customIntegrationIndications = [];
  }

  public addCustomIndication(_newIndication: string) {
    this._customIntegrationIndications.push(_newIndication);
  }
  // Public method to integrate outcomes from different cognitive components
  public async integrateOutcomes(outcome1: string, outcome2: string) {
    // console.log('Outcome 1: ', outcome1);

    // console.log('Outcome2: ', outcome2);

    const prompt = this.createIntegrationPrompt(outcome1, outcome2);
    const integratedResponse = await this.llmInterface.ask(prompt);
    // console.log('Integrated Response: ', integratedResponse);
    return integratedResponse;
  }

  // Private method to create a prompt for the LLM to integrate the outcomes
  private createIntegrationPrompt(outcome1: string, outcome2: string): string {
    const customIndication = this._customIntegrationIndications.length > 0 ? "Consider following instructions in the integration:\n" + this._customIntegrationIndications.join('\n') : ""
    return `Synthesize and integrate the outcomes from two different cognitive processing paths into a single, comprehensive response. ${customIndication} Path 1 Outcome: ${outcome1}, Path 2 Outcome: ${outcome2}`;
  }
}
