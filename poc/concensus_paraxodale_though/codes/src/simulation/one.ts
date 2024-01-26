import { LogLevel } from '@brainstack/log';
import { LocalAI } from '../ai/local.ai';
import { TogetherAI } from '../ai/together.ai';
import { Awareness } from '../awareness';
import { IntegrationOfOutcomes } from '../integration';
import { Memory } from '../memory';
import { Emotion } from '../emotion';
import { Reasoning } from '../reasoning';

const aiTogetherInterface = new TogetherAI();
const aiLocalInterface = new LocalAI()
// Instantiate cognitive model components

const aiInterface = aiTogetherInterface

const awareness = new Awareness(aiInterface);
const memory = new Memory(aiInterface);
const emotion = new Emotion(aiInterface);
const reasoning = new Reasoning(aiInterface);
const thirdElement = new IntegrationOfOutcomes(aiInterface);

emotion.addCoreValue("genuine")
emotion.addCoreValue("honnest")
emotion.addCoreValue("humour")
emotion.setEmotionalState("balanced, zen, mindfull")
reasoning.addLogicalFramework("When small talk, keep my answer short.")
thirdElement.addCustomIndication("Select best answer possible and surround the spoken part of my thoughts between <my_spoken_answer>{my spoken answer here}</my_spoken_answer>.")



async function leftHemisphereAnalytic(input: string): Promise<string> {
  const awarenessOutput = await awareness.processInput(input);
  const reasoningOutput = await reasoning.analyzeAndDecide(awarenessOutput);
  const emotionOutput = await emotion.integrateInformation(
    reasoningOutput + awarenessOutput,
  );
  const memoryOutput = await memory.retrieveInformation(input);

  return (
    'Left Hemisphere - Analytic' + '\n' +
    'My Awareness Output: ' + awarenessOutput + '\n' +
    'My Reasoning Output: ' + reasoningOutput + '\n' +
    'My Emotion Output: ' + emotionOutput + '\n' +
    'My Memory Output: ' + memoryOutput + '\n' +
    'Input: ' + input
  );
}

async function rightHemisphereCreative(input: string): Promise<string> {
  const awarenessOutput = await awareness.processInput(input);
  const memoryOutput = await memory.retrieveInformation(input);
  const emotionOutput = await emotion.integrateInformation(memoryOutput);
  const reasoningOutput = await reasoning.analyzeAndDecide(emotionOutput);

  return (
    'Right Hemisphere - Creative' + '\n' +
    'My Awareness Output: ' + awarenessOutput + '\n' +
    'My Memory Output: ' + memoryOutput + '\n' +
    'My Emotion Output: ' + emotionOutput + '\n' +
    'My Reasoning Output: ' + reasoningOutput + '\n' +
    'Input: ' + input
  );
}


const think = async (_message: string) => {
  const leftResult = await leftHemisphereAnalytic(_message);
  const rightResult = await rightHemisphereCreative(_message);


  const finalThought = await thirdElement.integrateOutcomes(leftResult, rightResult);

  console.log(`
****************************************************************************
${leftResult}

****************************************************************************
${rightResult}

////////////////////////////////////////////////////////////////////////////
FINAL Thought
////////////////////////////////////////////////////////////////////////////
${finalThought}


`);

  memory.storeInformation(`
  [${new Date().toLocaleDateString()}:${new Date().toLocaleTimeString()}]
  Message:
  ${_message}
  My Thought:
  ${finalThought}
  `);
};





think(`Hey what's up, what's your name?`)
.then(()=>{

  think(`Nice to meet you iBrain! I am Martin. Do you know what time is it, I am in Montreal?`)
  .catch(console.error)
  .finally(() => {
    console.log(`SECOND FINISHED`);
  });


})
  .catch(console.error)
  .finally(() => {
    console.log(`FIRST FINISHED`);
  });


