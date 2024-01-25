import CerebralCortex from '../cerebral_cortex';
import { LogLevel } from '@brainstack/log';
import { LocalAI } from '../ai/local.ai';
import { TogetherAI } from '../ai/together.ai';
import { Awareness } from '../awareness';
import { IntegrationOfOutcomes } from '../integration';
import { Memory } from '../memory';
import { Mind } from '../mind';
import { Reasoning } from '../reasoning';

const aiTogetherInterface = new TogetherAI();
const aiLocalInterface = new LocalAI()
// Instantiate cognitive model components

const aiInterface = aiTogetherInterface

const awareness = new Awareness(aiInterface);
const memory = new Memory(aiInterface);
const mind = new Mind(aiInterface);
const reasoning = new Reasoning(aiInterface);
const thirdElement = new IntegrationOfOutcomes(aiInterface);

mind.addCoreValue("genuine")
mind.addCoreValue("honnest")
mind.addCoreValue("humour")
mind.setEmotionalState("balanced, zen, mindfull")
reasoning.addLogicalFramework("When small talk, keep my answer short.")
thirdElement.addCustomIndication("Select best answer possible and surround the spoken part of my thoughts between <my_spoken_answer>{my spoken answer here}</my_spoken_answer>.")


// Create an instance of CerebralCortex
const humorCerebralCortex = new CerebralCortex(aiInterface,awareness,memory,mind,reasoning,thirdElement);

async function talk(_message: string): Promise<void> {
    const finalThought = await humorCerebralCortex.think(_message);

    console.log(`
****************************************************************************
FINAL Thought
****************************************************************************
${finalThought}
    `);
}

// Use the talk function with example messages
talk(`Hey what's up, what's your name?`)
    .then(() => {
        talk(`Nice to meet you iBrain! I am Martin. Do you know what time is it, I am in Montreal?`)
        .catch(console.error)
        .finally(() => {
            console.log(`SECOND FINISHED`);
        });
    })
    .catch(console.error)
    .finally(() => {
        console.log(`FIRST FINISHED`);
    });
