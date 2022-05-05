import dayjs from 'dayjs';
import { longerThan, startIsBeforeEnd } from './intervals';

describe(longerThan, () => {
  it('returns “^Shorter than duration” if an interval argument is shorter than a options.duration argument', () => {
    expect(
      longerThan(
        {
          start: dayjs(),
          end: dayjs(),
        },
        { duration: 10 }
      )
    ).toEqual('^Shorter than duration');
    expect(
      longerThan(
        {
          start: dayjs(),
          end: dayjs().add(9, 'minute'),
        },
        { duration: 10 }
      )
    ).toEqual('^Shorter than duration');
  });

  it('returns null if an interval argument is equals or longer than a options.duration argument', () => {
    expect(
      longerThan(
        {
          start: dayjs(),
          end: dayjs().add(60, 'minute'),
        },
        { duration: 10 }
      )
    ).toEqual(null);
    expect(
      longerThan(
        {
          start: dayjs(),
          end: dayjs().add(10, 'minute'),
        },
        { duration: 10 }
      )
    ).toEqual(null);
  });
});

describe(startIsBeforeEnd, () => {
  it('returns “^Later than end” if interval.start argument is a later datetime than interval.end argument', () => {
    expect(
      startIsBeforeEnd(
        {
          start: dayjs(),
          end: dayjs().subtract(1, 'second'),
        },
        true
      )
    ).toEqual('^Later than end');
  });

  it('returns null if interval.start argument is an earlier or the same datetime as interval.end argument', () => {
    expect(
      startIsBeforeEnd(
        {
          start: dayjs(),
          end: dayjs().add(1, 'second'),
        },
        true
      )
    ).toEqual(null);
    expect(
      startIsBeforeEnd(
        {
          start: dayjs(),
          end: dayjs(),
        },
        true
      )
    ).toEqual(null);
  });
});
