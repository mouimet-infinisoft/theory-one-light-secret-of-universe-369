import CerebralCortex from '../cerebral_cortex';

// Create an instance of CerebralCortex
const cerebralCortex = new CerebralCortex();

async function talk(_message: string): Promise<void> {
    const finalThought = await cerebralCortex.think(_message);

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
