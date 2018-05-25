import { v4 as uuid } from 'uuid';

type Aligance =  'none' | 'villager' | 'werewolf';

interface ICard {
  readonly aligance: Aligance;
  readonly name: string;
  readonly occurance?: number;
}

export class Card {
  public readonly id: string;
  private _aligance?: Aligance;

  constructor(private config: ICard) {
    this.id = uuid();
  }

  get aligance() {
    return this._aligance || this.config.aligance;
  }

  set aligance(value: Aligance) {
    this._aligance = value;
  }
}
