import { AiBase } from './implementation';
import { config } from 'dotenv';
import axios from 'axios';
import { system_prompt } from './system_prompt';
import { LogLevel } from '@brainstack/log';
config();

const TOKEN = process.env.TOGETHERAPI;

export class TogetherAI extends AiBase {
  constructor(_logLevel: LogLevel=LogLevel.LOG){
    super(_logLevel)
  }
  
  async ask(prompt: string) {
    super.ask(prompt)

    if (!TOKEN) {
      throw new Error('TogetherAI Has no token configured!');
    }

    const result = await axios.post<any>(
      'https://api.together.xyz/inference',
      {
        model: 'togethercomputer/llama-2-70b-chat',
        max_tokens: 512,
        prompt: `${system_prompt} [INST] ${prompt} [/INST]`,
        request_type: 'language-model-inference',
        temperature: 0.7,
        top_p: 0.7,
        top_k: 50,
        repetition_penalty: 1,
        stream_tokens: false,
        stop: ['[/INST]', '</s>'],
        negative_prompt: '',
        sessionKey: '2a490aeb-8527-44a5-9145-a24a5747e18c',
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      },
    );
    const reasonedThough = result.data.output.choices[0].text;
    this._log.verbose(reasonedThough);
    return reasonedThough;
  }
}
