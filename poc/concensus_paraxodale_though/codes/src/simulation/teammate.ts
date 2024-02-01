import CerebralCortex from '../cerebral_cortex';
import { humorCerebralCortex } from './humor';
import { extractContentByTag } from '../utils/extract_content_by_tag';

class Teammate {
    private cerebralCortex: CerebralCortex;

    constructor(cerebralCortex: CerebralCortex) {
        this.cerebralCortex = cerebralCortex;
    }

    async talk(message: string): Promise<string> {
        const finalThought = await this.cerebralCortex.think(message);
        return extractContentByTag(finalThought, 'my_spoken_answer')?.[0] ?? '';
    }
}

// Example usage with async/await
async function interactWithTeammate() {
    const teammate = new Teammate(humorCerebralCortex);

    try {
        const firstAnswer = await teammate.talk(`Hey what's up, what's your name?`);
        console.log(`FIRST ANSWER: `, firstAnswer);

        const secondAnswer = await teammate.talk(`Nice to meet you iBrain! I am Martin. Do you know what time it is in Montreal?`);
        console.log(`SECOND ANSWER: `, secondAnswer);

        console.log(`INTERACTION FINISHED`);
    } catch (error) {
        console.error(error);
    }
}

interactWithTeammate();
