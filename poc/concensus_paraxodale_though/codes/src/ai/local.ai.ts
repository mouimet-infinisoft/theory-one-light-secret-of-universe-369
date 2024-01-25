import { IAi } from './abstraction';
import { AiBase } from './implementation';
import axios from 'axios';
import { system_prompt } from './system_prompt';
import { LogLevel } from '@brainstack/log';
import { config } from 'dotenv';
config();

const LOCALAPI = process.env.LOCALAPI;

export class LocalAI extends AiBase implements IAi {
  constructor(_logLevel: LogLevel = LogLevel.LOG) {
    super(_logLevel);
  }
  async ask(prompt: string) {
    super.ask(prompt);

    if (!LOCALAPI) {
      throw new Error('Local API not configured!');
    }

    const result = await axios.post<{ response: string }>(
      LOCALAPI,
      {
        text: `${system_prompt} [INST] ${prompt} [/INST]`,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const reasonedThough = result.data.response;
    this._log.verbose(reasonedThough);
    return reasonedThough;
  }
}
