import { v4 as uuid } from 'uuid';

import { Card } from '../card';
import { Player } from '../player';
import { Trace } from '../trace';

export class Table {
  public readonly id: string;
  public remaining?: ReadonlyArray<Card>;
  public cards: Card[];

  private readonly trace: Trace;

  constructor(public players: ReadonlyArray<Player>, cards: ReadonlyArray<Card>) {
    this.id = uuid();
    this.trace = new Trace();
    this.cards = [...cards];
  }

  public setup() {
    this.trace.push({action: 'table.setup'});

    this.playersCardsRatio();

    this.dealCards();
  }

  /* tslint:disable:insecure-random */
  public shuffle() {
    let currentIndex = this.cards.length;
    let temporaryValue;
    let randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = this.cards[currentIndex];
      this.cards[currentIndex] = this.cards[randomIndex];
      this.cards[randomIndex] = temporaryValue;
    }
  }
  /* tslint:enable:insecure-random */

  private dealCards() {
    this.shuffle();

    this.remaining = this.cards.reduce((remains: Card[], card: Card) => {
      const i = this.cards.indexOf(card);

      if (this.players.length > i) {
        this.players[i].assign(card);
      } else {
        remains.push(card);
      }

      return remains;
    }, []);
  }

  private playersCardsRatio() {
    if (this.cards.length - 3 < this.players.length) {
      throw new Error(`not enough cards (${this.cards.length}) for the number of players (${this.players.length} + 3)`);
    }

    if (this.cards.length - 3 > this.players.length) {
      throw new Error(`not enough players (${this.players.length}) for the number of cards (${this.cards.length} - 3)`);
    }
  }
}
