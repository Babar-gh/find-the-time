import dayjs from 'dayjs';
import { DATE_DEFAULT } from 'constants/formats';

const now = dayjs();

const templates = [
  ([first, second]: string[]) => ({
    duration: 45,
    subscriptions: [
      {
        availability: [
          {
            start: `${first} 08:00:00`,
            end: `${first} 18:00:00`,
          },
          {
            start: `${second} 09:00:00`,
            end: `${second} 20:00:00`,
          },
        ],
      },
      {
        availability: [
          {
            start: `${first} 10:00:00`,
            end: `${first} 16:00:00`,
          },
          {
            start: `${second} 09:00:00`,
            end: `${second} 14:00:00`,
          },
          {
            start: `${second} 17:00:00`,
            end: `${second} 20:00:00`,
          },
        ],
      },
      {
        availability: [
          {
            start: `${first} 08:00:00`,
            end: `${first} 14:00:00`,
          },
          {
            start: `${second} 11:00:00`,
            end: `${second} 18:00:00`,
          },
        ],
      },
      {
        availability: [
          {
            start: `${first} 12:00:00`,
            end: `${first} 18:00:00`,
          },
          {
            start: `${second} 13:00:00`,
            end: `${second} 19:00:00`,
          },
        ],
      },
    ],
    chosenInterval: {
      start: `${first} 13:15:00`,
      end: `${first} 14:00:00`,
    },
  }),
];

const daySets = [
  [now.add(1, 'day'), now.add(2, 'day'), now.add(3, 'day')],
  [now.subtract(3, 'day'), now.subtract(2, 'day'), now.subtract(1, 'day')],
].map((sets) => sets.map((day) => day.format(DATE_DEFAULT)));

export const schedules = daySets.flatMap((set) =>
  templates.map((fillTemplate) => fillTemplate(set))
);
