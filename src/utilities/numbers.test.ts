import {
  parsePositiveInt,
  treatNaNAsZero,
  treatNaNAsEmptyString,
} from './numbers';

describe(parsePositiveInt, () => {
  it('parses a string argument and returns a positive integer', () => {
    expect(parsePositiveInt('1')).toEqual(1);
    expect(parsePositiveInt('-1')).toEqual(1);
    expect(parsePositiveInt('88005553535')).toEqual(88005553535);
    expect(parsePositiveInt('-88005553535')).toEqual(88005553535);
  });

  it('returns NaN if the string argument cannot be converted to a number', () => {
    expect(parsePositiveInt('kek')).toEqual(NaN);
    expect(parsePositiveInt('')).toEqual(NaN);
    expect(parsePositiveInt('infinity')).toEqual(NaN);
  });
});

describe(treatNaNAsZero, () => {
  it('returns 0 if a number argument is a NaN', () => {
    expect(treatNaNAsZero(NaN)).toEqual(0);
  });

  it('returns the number argument unchanged if it is not a NaN', () => {
    expect(treatNaNAsZero(1)).toEqual(1);
  });
});

describe(treatNaNAsEmptyString, () => {
  it('returns an empty string if a number argument is a NaN', () => {
    expect(treatNaNAsEmptyString(NaN)).toEqual('');
  });

  it('returns the number argument unchanged if it is not a NaN', () => {
    expect(treatNaNAsZero(1)).toEqual(1);
  });
});
