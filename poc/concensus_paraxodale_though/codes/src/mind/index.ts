import { IAi } from '../ai/abstraction';

export class Mind {
  private _customIntegrationIndications: string[];

  constructor(private llmInterface: IAi) {
    this._customIntegrationIndications = [];
  }

  public addCustomIndication(_newIndication: string) {
    this._customIntegrationIndications.push(_newIndication);
  }
  // Public method to integrate outcomes from different cognitive components
  public async integrateOutcomes(
    outcome1: string,
    outcome2: string,
    awareness?: string,
  ) {
    const prompt = this.createIntegrationPrompt(outcome1, outcome2, awareness);
    const integratedResponse = await this.llmInterface.ask(prompt);
    // console.log('Integrated Response: ', integratedResponse);
    return integratedResponse;
  }

  // Private method to create a prompt for the LLM to integrate the outcomes
  private createIntegrationPrompt(
    outcome1: string,
    outcome2: string,
    awareness?: string,
  ): string {
    const awarenessPerception =
      Number(awareness?.length ?? 0) > 0
        ? 'This is my current perception:\n' + awareness
        : '';
    const customIndication =
      this._customIntegrationIndications.length > 0
        ? 'Consider following instructions in the integration:\n' +
          this._customIntegrationIndications.join('\n')
        : '';
    return `Synthesize and integrate the outcomes from two different cognitive processing paths into a single, comprehensive response. ${customIndication}. ${awarenessPerception} Path 1 Outcome: ${outcome1}, Path 2 Outcome: ${outcome2}`;
  }
}
