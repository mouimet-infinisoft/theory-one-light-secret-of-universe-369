import { LogLevel, Logger, createLogger } from '@brainstack/log';
import { IAi } from './abstraction';

// Implement the IAi interface
export class AiBase implements IAi {
  protected _log: Logger;

  constructor(_logLevel: LogLevel = LogLevel.LOG) {
    this._log = createLogger(_logLevel);
  }
  
  async ask(prompt: string) {
    this._log.verbose(`Ask function called with prompt: `, prompt);

    return `Response to '${prompt}'`;
  }
}
