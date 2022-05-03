import dayjs from 'dayjs';
import { longerThan } from './intervals';

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
