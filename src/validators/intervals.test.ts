import dayjs from 'dayjs';
import { notShorterThan, startIsBeforeEnd } from './intervals';

const now = dayjs();

describe(notShorterThan, () => {
  const errorMessage = '^Shorter than duration';

  it(`returns “${errorMessage}” if an interval argument is shorter than an options.duration argument`, () => {
    expect(
      notShorterThan(
        {
          start: dayjs(now),
          end: dayjs(now),
        },
        { duration: 10 }
      )
    ).toEqual(errorMessage);

    expect(
      notShorterThan(
        {
          start: dayjs(now),
          end: dayjs(now).add(9, 'minute').add(59, 'second'),
        },
        { duration: 10 }
      )
    ).toEqual(errorMessage);
  });

  it('returns null if an interval argument equals or is longer than a options.duration argument', () => {
    expect(
      notShorterThan(
        {
          start: dayjs(now),
          end: dayjs(now).add(60, 'minute'),
        },
        { duration: 10 }
      )
    ).toEqual(null);

    expect(
      notShorterThan(
        {
          start: dayjs(now),
          end: dayjs(now).add(10, 'minute'),
        },
        { duration: 10 }
      )
    ).toEqual(null);
  });
});

describe(startIsBeforeEnd, () => {
  const errorMessage = '^Later than end';

  it(`returns “${errorMessage}” if an interval.start argument is a later or the same datetime as an interval.end argument`, () => {
    expect(
      startIsBeforeEnd(
        {
          start: dayjs(now),
          end: dayjs(now).subtract(1, 'second'),
        },
        true
      )
    ).toEqual(errorMessage);

    expect(
      startIsBeforeEnd(
        {
          start: dayjs(now),
          end: dayjs(now),
        },
        true
      )
    ).toEqual(errorMessage);
  });

  it('returns null if an interval.start argument is an earlier datetime than an interval.end argument', () => {
    expect(
      startIsBeforeEnd(
        {
          start: dayjs(now),
          end: dayjs(now).add(1, 'second'),
        },
        true
      )
    ).toEqual(null);
  });
});
