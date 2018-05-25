import { Table } from '.';

import { Card } from '../card';
import { Player } from '../player';

const jeff = new Player('jeff');
const villager1 = new Card({aligance: 'villager', name: 'villager'});
const werewolf1 = new Card({aligance: 'werewolf', name: 'werewolf'});
const werewolf2 = new Card({aligance: 'werewolf', name: 'werewolf'});
const seer = new Card({aligance: 'villager', name: 'seer'});
const robber = new Card({aligance: 'villager', name: 'robber'});

test('should throw an error if insufficient player:card ratio detected', () => {
  const cards1 = [ villager1 ];
  const cards2 = [ villager1, werewolf1, werewolf2, seer, robber ];
  const players = [ jeff ];

  const table1 = new Table(players, cards1);
  const table2 = new Table(players, cards2);

  expect(() => {
    table1.setup();
  }).toThrow(/not enough cards/);

  expect(() => {
    table2.setup();
  }).toThrow(/not enough players/);
});

test('should setup the table correctly', () => {
  const cards = [ villager1, werewolf1, seer, robber ];
  const players = [ jeff ];

  const table = new Table(players, cards);
  table.setup();

  expect(table.remaining).toBeDefined();
  expect(table.remaining ? table.remaining.length : 0).toBe(3);
});

test('should shuffle the array correctly', () => {
  // Make sure shuffle does always the right thing for the test.
  const mockMath = Object.create(global.Math);
  mockMath.random = () => 0.261599165379824;
  global.Math = mockMath;

  const cards = [ villager1, werewolf1, seer, robber ];
  const players = [ jeff ];

  const table = new Table(players, cards);

  const a = table.cards[0].id;
  table.shuffle();
  const b = table.cards[0].id;

  expect(a).not.toBe(b);
});
