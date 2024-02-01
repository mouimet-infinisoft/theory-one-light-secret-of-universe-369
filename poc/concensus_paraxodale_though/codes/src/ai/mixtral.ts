import { AiBase } from './implementation';
import { config } from 'dotenv';
import axios from 'axios';
import { system_prompt } from './system_prompt';
import { LogLevel } from '@brainstack/log';
config();

const TOKEN = process.env.TOGETHERAPI;

export class MixtralAI extends AiBase {
  constructor(_logLevel: LogLevel=LogLevel.LOG){
    super(_logLevel)
  }
  
  async ask(prompt: string) {
    super.ask(prompt)

    if (!TOKEN) {
      throw new Error('MixtralAI Has no token configured!');
    }

    const result = await axios.post<any>(
      'https://api.together.xyz/v1/chat/completions',
      {
        "model": "DiscoResearch/DiscoLM-mixtral-8x7b-v2",
        "max_tokens": 512,
        "prompt": `<|im_start|>user\n${prompt}<|im_end|>\n<|im_start|>assistant`,
        "request_type": "language-model-inference",
        "temperature": 0.7,
        "top_p": 0.7,
        "top_k": 50,
        "repetition_penalty": 1,
        "stream_tokens": false,
        "stop": [
          "<|im_end|>",
          "</s>",
          "<|im_start|>"
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      },
    );
    const reasonedThough = result.data.choices?.[0].message?.content;
    this._log.verbose(reasonedThough);
    return reasonedThough;
  }
}

