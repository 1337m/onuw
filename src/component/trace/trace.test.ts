import { Trace } from '.';

test('should push into trace correctly', () => {
  const trace = new Trace();

  trace.push({
    action: 'test',
    message: 'first',
  }, {
    action: 'test',
    message: 'second',
  });

  expect(trace.stack.length).toBe(2);
  expect(trace.stack[1].message).toBe('second');
});
