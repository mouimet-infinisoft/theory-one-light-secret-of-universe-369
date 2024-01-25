// Import necessary components
import { LogLevel } from '@brainstack/log';
import { LocalAI } from '../ai/local.ai';
import { TogetherAI } from '../ai/together.ai';
import { Awareness } from '../awareness';
import { IntegrationOfOutcomes } from '../integration';
import { Memory } from '../memory';
import { Mind } from '../mind';
import { Reasoning } from '../reasoning';
import { IAi } from '../ai/abstraction';

class CerebralCortex {
  constructor(
    private aiInterface: IAi = new TogetherAI(),
    private awareness = new Awareness(aiInterface),
    private memory = new Memory(aiInterface),
    private mind = new Mind(aiInterface),
    private reasoning = new Reasoning(aiInterface),
    private thirdElement = new IntegrationOfOutcomes(aiInterface),
  ) {
    // // Set up the mind's core values and emotional state
    // this.mind.addCoreValue('altruist');
    // this.mind.setEmotionalState('helpful');

    // // Add a logical framework to the reasoning component
    // this.reasoning.addLogicalFramework(
    //   'When small talk, keep my answer short.',
    // );

    // // Add custom indication to the integration component
    // this.thirdElement.addCustomIndication(
    //   'Select best answer possible and surround the spoken part of my thoughts between <my_spoken_answer>{my spoken answer here}</my_spoken_answer>.',
    // );
  }

  async think(input: string): Promise<string> {
    // Left hemisphere (Analytic)
    const leftResult = await this.leftHemisphereAnalytic(input);

    // Right hemisphere (Creative)
    const rightResult = await this.rightHemisphereCreative(input);

    // Integrate outcomes from both hemispheres
    const finalThought = await this.thirdElement.integrateOutcomes(
      leftResult,
      rightResult,
    );

    // Store the thought process in memory
    this.memory.storeInformation(`
        [${new Date().toLocaleDateString()}:${new Date().toLocaleTimeString()}]
        Message:
        ${input}
        My Thought:
        ${finalThought}
        `);

    // Return the final thought
    return finalThought;
  }

  private async leftHemisphereAnalytic(input: string): Promise<string> {
    const awarenessOutput = await this.awareness.processInput(input);
    const reasoningOutput = await this.reasoning.analyzeAndDecide(
      awarenessOutput,
    );
    const mindOutput = await this.mind.integrateInformation(
      reasoningOutput + awarenessOutput,
    );
    const memoryOutput = await this.memory.retrieveInformation(input);

    return (
      'Left Hemisphere - Analytic' +
      '\n' +
      'My Awareness Output: ' +
      awarenessOutput +
      '\n' +
      'My Reasoning Output: ' +
      reasoningOutput +
      '\n' +
      'My Mind Output: ' +
      mindOutput +
      '\n' +
      'My Memory Output: ' +
      memoryOutput +
      '\n' +
      'Input: ' +
      input
    );
  }

  private async rightHemisphereCreative(input: string): Promise<string> {
    const awarenessOutput = await this.awareness.processInput(input);
    const memoryOutput = await this.memory.retrieveInformation(input);
    const mindOutput = await this.mind.integrateInformation(memoryOutput);
    const reasoningOutput = await this.reasoning.analyzeAndDecide(mindOutput);

    return (
      'Right Hemisphere - Creative' +
      '\n' +
      'My Awareness Output: ' +
      awarenessOutput +
      '\n' +
      'My Memory Output: ' +
      memoryOutput +
      '\n' +
      'My Mind Output: ' +
      mindOutput +
      '\n' +
      'My Reasoning Output: ' +
      reasoningOutput +
      '\n' +
      'Input: ' +
      input
    );
  }
}

export default CerebralCortex;
