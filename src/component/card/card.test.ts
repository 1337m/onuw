import { Card } from '.';

test('should read/write aligance correctly', () => {
  const card = new Card({
    aligance: 'none',
    name: 'doppelganger',
  });

  expect(card.aligance).toBe('none');

  card.aligance = 'werewolf';
  expect(card.aligance).toBe('werewolf');
});
