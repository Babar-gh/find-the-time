import {
  parsePositiveInt,
  treatNaNAsZero,
  treatNaNAsEmptyString,
} from 'utility';

it('parses int and returns its absolute value', () => {
  expect(parsePositiveInt('1')).toEqual(1);
  expect(parsePositiveInt('-1')).toEqual(1);
  expect(parsePositiveInt('kek')).toEqual(NaN);
});

it('returns 0 if argument is NaN, otherwise returns the argument unchanged', () => {
  expect(treatNaNAsZero(NaN)).toEqual(0);
  expect(treatNaNAsZero(1)).toEqual(1);
});

it('returns an empty string if argument is NaN, otherwise returns the argument unchanged', () => {
  expect(treatNaNAsEmptyString(NaN)).toEqual('');
  expect(treatNaNAsEmptyString(1)).toEqual(1);
});
