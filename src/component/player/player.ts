import { v4 as uuid } from 'uuid';

import { Card } from '../card';

export class Player {
  public readonly id: string;
  public role?: Card;

  constructor(public name: string) {
    this.id = uuid();
  }

  public assign(role: Card) {
    this.role = role;
  }

  public clear() {
    this.role = undefined;
  }
}
