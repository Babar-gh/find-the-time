import dayjs from 'dayjs';
import { longerThan, startIsBeforeEnd } from './intervals';

const now = dayjs();

describe(longerThan, () => {
  const errorMessage = '^Shorter than duration';

  it(`returns “${errorMessage}” if an interval argument is shorter than an options.duration argument`, () => {
    expect(
      longerThan(
        {
          start: dayjs(now),
          end: dayjs(now),
        },
        { duration: 10 }
      )
    ).toEqual(errorMessage);

    expect(
      longerThan(
        {
          start: dayjs(now),
          end: dayjs(now).add(9, 'minute').add(59, 'second'),
        },
        { duration: 10 }
      )
    ).toEqual(errorMessage);
  });

  it('returns null if an interval argument is equals or longer than a options.duration argument', () => {
    expect(
      longerThan(
        {
          start: dayjs(now),
          end: dayjs(now).add(60, 'minute'),
        },
        { duration: 10 }
      )
    ).toEqual(null);

    expect(
      longerThan(
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

  it(`returns “${errorMessage}” if an interval.start argument is a later datetime than an interval.end argument`, () => {
    expect(
      startIsBeforeEnd(
        {
          start: dayjs(now),
          end: dayjs(now).subtract(1, 'second'),
        },
        true
      )
    ).toEqual(errorMessage);
  });

  it('returns null if an interval.start argument is an earlier or the same datetime as an interval.end argument', () => {
    expect(
      startIsBeforeEnd(
        {
          start: dayjs(now),
          end: dayjs(now).add(1, 'second'),
        },
        true
      )
    ).toEqual(null);

    expect(
      startIsBeforeEnd(
        {
          start: dayjs(now),
          end: dayjs(now),
        },
        true
      )
    ).toEqual(null);
  });
});
