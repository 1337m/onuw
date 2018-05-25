import { Player } from '.';
import { Card } from '../card';

test('should assign card to player correctly', () => {
  const card = new Card({
    aligance: 'werewolf',
    name: 'wereewolf',
  });

  const player = new Player('jeff');
  expect(player.role).toBeUndefined();

  player.assign(card);
  expect(player.role ? player.role.aligance : 'none').toBe('werewolf');
});

test('should clear players card correctly', () => {
  const card = new Card({
    aligance: 'werewolf',
    name: 'wereewolf',
  });

  const player = new Player('jeff');
  expect(player.role).toBeUndefined();

  player.assign(card);
  expect(player.role ? player.role.aligance : 'none').toBe('werewolf');

  player.clear();
  expect(player.role).toBeUndefined();
});
