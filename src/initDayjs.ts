import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import isBetween from 'dayjs/plugin/isBetween';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/en-gb';

dayjs.extend(duration);
dayjs.extend(isBetween);
dayjs.extend(relativeTime);
