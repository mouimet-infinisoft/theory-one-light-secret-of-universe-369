// Import necessary components
import { LogLevel } from '@brainstack/log';
import { LocalAI } from '../ai/local.ai';
import { TogetherAI } from '../ai/together.ai';
import { Awareness } from '../awareness';
import { Mind } from '../mind';
import { Memory } from '../memory';
import { Emotion } from '../emotion';
import { Reasoning } from '../reasoning';
import { IAi } from '../ai/abstraction';

class CerebralCortex {
  constructor(
    private aiInterface: IAi = new TogetherAI(),
    private awareness = new Awareness(aiInterface),
    private memory = new Memory(aiInterface),
    private emotion = new Emotion(aiInterface),
    private reasoning = new Reasoning(aiInterface),
    private mind = new Mind(aiInterface),
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
    const finalThought = await this.mind.integrateOutcomes(
      leftResult,
      rightResult,
      this.awareness.perception.join('\n')
    );

    // Store the thought process in memory
    this.memory.storeInformation(`
        [${new Date().toUTCString()}]
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
    const emotionOutput = await this.emotion.integrateInformation(
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
      'My Emotion Output: ' +
      emotionOutput +
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
    const emotionOutput = await this.emotion.integrateInformation(memoryOutput);
    const reasoningOutput = await this.reasoning.analyzeAndDecide(emotionOutput);

    return (
      'Right Hemisphere - Creative' +
      '\n' +
      'My Awareness Output: ' +
      awarenessOutput +
      '\n' +
      'My Memory Output: ' +
      memoryOutput +
      '\n' +
      'My Emotion Output: ' +
      emotionOutput +
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
