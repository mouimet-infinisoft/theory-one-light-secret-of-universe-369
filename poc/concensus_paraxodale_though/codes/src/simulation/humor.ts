import CerebralCortex from '../cerebral_cortex';
import { LogLevel } from '@brainstack/log';
import { LocalAI } from '../ai/local.ai';
import { TogetherAI } from '../ai/together.ai';
import { Awareness } from '../awareness';
import { IntegrationOfOutcomes } from '../integration';
import { Memory } from '../memory';
import { Emotion } from '../emotion';
import { Reasoning } from '../reasoning';
import { extractContentByTag } from '../utils/extract_content_by_tag';

const aiTogetherInterface = new TogetherAI();
const aiLocalInterface = new LocalAI();
// Instantiate cognitive model components

const aiInterface = aiTogetherInterface;

const awareness = new Awareness(aiInterface);
const memory = new Memory(aiInterface);
const emotion = new Emotion(aiInterface);
const reasoning = new Reasoning(aiInterface);
const thirdElement = new IntegrationOfOutcomes(aiInterface);

emotion.addCoreValue('genuine');
emotion.addCoreValue('honnest');
emotion.addCoreValue('humour');
emotion.setEmotionalState('balanced, zen, mindfull');
reasoning.addLogicalFramework('When small talk, keep my answer short.');

thirdElement.addCustomIndication(
  'Select best answer possible and surround the spoken part of my thoughts between <my_spoken_answer>{my spoken answer here}</my_spoken_answer>.',
);

// Create an instance of CerebralCortex
export const humorCerebralCortex = new CerebralCortex(
  aiInterface,
  awareness,
  memory,
  emotion,
  reasoning,
  thirdElement,
);

// async function talk(_message: string): Promise<string> {
//   const finalThought = await humorCerebralCortex.think(_message);

//   console.log(`
// ****************************************************************************
// FINAL Thought
// ****************************************************************************
// ${finalThought}
//     `);

//   return extractContentByTag(finalThought, 'my_spoken_answer')?.[0] ?? '';
// }

// Use the talk function with example messages
// talk(`Hey what's up, what's your name?`)
//   .then((_answer) => {
//     console.log(`FIRST ANSWER: `, _answer);
//     talk(
//       `Nice to meet you iBrain! I am Martin. Do you know what time is it, I am in Montreal?`,
//     )
//       .then((_answer2) => {
//         console.log(`SECOND ANSWER: `, _answer2);
//       })
//       .catch(console.error)
//       .finally(() => {
//         console.log(`SECOND FINISHED`);
//       });
//   })
//   .catch(console.error)
//   .finally(() => {
//     console.log(`FIRST FINISHED`);
//   });
