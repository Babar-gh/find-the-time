import dayjs from 'dayjs';
import { checkIntersection, getIntersection } from './intervals';

const now = dayjs();

const ordered = [
  dayjs(now),
  dayjs(now).add(1, 'hour'),
  dayjs(now).add(2, 'hour'),
  dayjs(now).add(3, 'hour'),
];

describe(getIntersection, () => {
  it('finds and returns the intersection TimeInterval of two TimeInterval arguments if they overlap', () => {
    expect(
      getIntersection(
        { start: ordered[0], end: ordered[2] },
        { start: ordered[1], end: ordered[3] }
      )
    ).toEqual({ start: ordered[1], end: ordered[2] });

    expect(
      getIntersection(
        { start: ordered[1], end: ordered[3] },
        { start: ordered[0], end: ordered[2] }
      )
    ).toEqual({ start: ordered[1], end: ordered[2] });

    expect(
      getIntersection(
        { start: ordered[0], end: ordered[3] },
        { start: ordered[1], end: ordered[2] }
      )
    ).toEqual({ start: ordered[1], end: ordered[2] });

    expect(
      getIntersection(
        { start: ordered[1], end: ordered[2] },
        { start: ordered[0], end: ordered[3] }
      )
    ).toEqual({ start: ordered[1], end: ordered[2] });
  });

  it('returns null if two TimeInterval arguments do not overlap', () => {
    expect(
      getIntersection(
        { start: ordered[0], end: ordered[1] },
        { start: ordered[2], end: ordered[3] }
      )
    ).toEqual(null);

    expect(
      getIntersection(
        { start: ordered[2], end: ordered[3] },
        { start: ordered[0], end: ordered[1] }
      )
    ).toEqual(null);
  });
});

describe(checkIntersection, () => {
  it('returns true if two TimeInterval arguments overlap', () => {
    expect(
      checkIntersection(
        { start: ordered[0], end: ordered[2] },
        { start: ordered[1], end: ordered[3] }
      )
    ).toEqual(true);

    expect(
      checkIntersection(
        { start: ordered[1], end: ordered[3] },
        { start: ordered[0], end: ordered[2] }
      )
    ).toEqual(true);

    expect(
      checkIntersection(
        { start: ordered[0], end: ordered[3] },
        { start: ordered[1], end: ordered[2] }
      )
    ).toEqual(true);

    expect(
      checkIntersection(
        { start: ordered[1], end: ordered[2] },
        { start: ordered[0], end: ordered[3] }
      )
    ).toEqual(true);
  });

  it('returns false if two TimeInterval arguments do not overlap', () => {
    expect(
      checkIntersection(
        { start: ordered[0], end: ordered[1] },
        { start: ordered[2], end: ordered[3] }
      )
    ).toEqual(false);

    expect(
      checkIntersection(
        { start: ordered[2], end: ordered[3] },
        { start: ordered[0], end: ordered[1] }
      )
    ).toEqual(false);
  });
});
