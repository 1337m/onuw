import { v4 as uuid } from 'uuid';

import { Player } from '../player';

interface ILog {
  readonly action: string;
  readonly message?: string;
  readonly primary?: Player;
  readonly secondary?: Player;

  readonly id?: string;
  readonly timestamp?: Date;
}

export class Trace {
  public readonly id: string;
  public readonly stack: ILog[];

  constructor() {
    this.id = uuid();
    this.stack = [];
  }

  /* tslint:disable:readonly-array */
  public push(...logs: ILog[]) {
    const entries = logs.reduce((es: ILog[], entry: ILog) => {
      es.push({
        ...entry,
        id: uuid(),
        timestamp: new Date(),
      });

      return es;
    }, []);

    this.stack.push(...entries);
  }
  /* tslint:enable:readonly-array */
}
