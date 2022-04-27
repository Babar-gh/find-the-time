import dayjs from 'dayjs';
import validate from 'validate.js';
import { uniqueId } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { MouseEventHandler, useState } from 'react';
import Button from 'ui-kit/Button';
import DatePicker from 'ui-kit/DatePicker';
import ErrorDisplay from 'ui-kit/ErrorDisplay';
import Form from 'ui-kit/Form';
import IconButton from 'ui-kit/IconButton';
import Input from 'ui-kit/Input';
import Loader from 'ui-kit/Loader';
import Page from 'ui-kit/Page';
import Text from 'components/Text';
import { createEvent } from 'api/events';
import { DATETIME_DEFAULT } from 'constants/formats';
import { PRIVATE } from 'constants/routes';
import { RowElement } from 'ui-kit/Form/components/Row/Row';
import { TimeInterval } from 'types/common';
import styles from './NewEvent.module.scss';

interface Interval extends TimeInterval {
  key: string;
}

const parseIntervalsForRequest = (intervals: Interval[]) =>
  intervals.map(({ start, end }) => ({
    start: start.format(DATETIME_DEFAULT),
    end: end.format(DATETIME_DEFAULT),
  }));

type ValidationErrors =
  | { title?: string; location?: string; duration?: string; intervals?: string }
  | undefined;

const constraints: any = {
  title: {
    length: {
      minimum: 3,
      max: 64,
    },
  },
  location: {
    length: {
      minimum: 3,
      max: 64,
    },
  },
  duration: {
    numericality: {
      greaterThan: 0,
    },
  },
  intervals: {
    noIntersections: true,
  },
};

const NewEvent: React.VFC = () => {
  const navigate = useNavigate();

  const [submitHasFailed, setSubmitHasFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [title, setTitle] = useState('');
  const [titleIsTouched, setTitleIsTouched] = useState(false);

  const [location, setLocation] = useState('');
  const [locationIsTouched, setLocationIsTouched] = useState(false);

  const [description, setDescription] = useState('');

  const [hrs, setHrs] = useState<number>(0);
  const [mins, setMins] = useState<number>(30);
  const duration = (isNaN(hrs) ? 0 : hrs) * 60 + (isNaN(mins) ? 0 : mins);
  const [durationIsTouched, setDurationIsTouched] = useState(false);

  const [intervals, setIntervals] = useState<Interval[]>([
    {
      start: dayjs().add(1, 'hour'),
      end: dayjs().add(3, 'hour'),
      key: uniqueId(),
    },
  ]);

  const errors: ValidationErrors = validate(
    { title, location, duration, intervals },
    constraints
  );

  let individualIntervalsAreInvalid: boolean;

  const getRangePicker = (index: number): RowElement => {
    const intervalPickerButtons = (
      <div className={styles['PickerButtons']}>
        {intervals.length > 1 && (
          <IconButton
            icon="Remove"
            elementProps={{
              onClick: () =>
                setIntervals((current) => {
                  const updated = [...current];
                  updated.splice(index, 1);

                  return updated;
                }),
            }}
          />
        )}
        {index === intervals.length - 1 && (
          <IconButton
            icon="Add"
            elementProps={{
              onClick: () =>
                setIntervals((current) => {
                  const updated = [...current];
                  updated.push({
                    start: dayjs(current[index].start).add(1, 'day'),
                    end: dayjs(current[index].end).add(1, 'day'),
                    key: uniqueId(),
                  });

                  return updated;
                }),
            }}
          />
        )}
      </div>
    );

    const startError: string | undefined = validate.single(intervals[index], {
      startIsBeforeEnd: true,
    });

    const endError: string | undefined = validate.single(intervals[index], {
      longerThan: { duration },
    });

    individualIntervalsAreInvalid = Boolean(startError || endError);

    return (
      <Form.Row key={intervals[index].key}>
        <Form.Item label="Start" errorMessage={startError} isRequired>
          <DatePicker
            value={intervals[index].start}
            onChange={(value) => {
              if (value) {
                setIntervals((current) => {
                  const updated = [...current];
                  updated[index].start = value;

                  return updated;
                });
              }
            }}
          />
        </Form.Item>
        <Form.Item
          label="End"
          errorMessage={endError}
          isRequired
          addons={intervalPickerButtons}
        >
          <DatePicker
            value={intervals[index].end}
            onChange={(value) => {
              if (value) {
                setIntervals((current) => {
                  const updated = [...current];
                  updated[index].end = value;

                  return updated;
                });
              }
            }}
          />
        </Form.Item>
      </Form.Row>
    );
  };

  const handleButtonClick: MouseEventHandler = async (_e) => {
    if (errors || individualIntervalsAreInvalid) {
      setTitleIsTouched(true);
      setLocationIsTouched(true);

      return;
    }

    setIsLoading(true);

    try {
      const response = await createEvent({
        title,
        location,
        comment: description,
        duration,
        initialIntervals: parseIntervalsForRequest(intervals),
      });

      navigate(`${PRIVATE.Events}/${response.data.id}`);
    } catch {
      setSubmitHasFailed(true);
    }

    setIsLoading(false);
  };

  return (
    <Page title="New Event">
      <Loader isShown={isLoading}>
        <div className={styles['Container']}>
          <Form defaultPreventedOnSubmission layout="responsive">
            <Form.Column>
              <Form.CustomItem>
                <div className={styles['FormErrorDisplay']}>
                  <ErrorDisplay isShown={submitHasFailed}>
                    Something went wrong! You can try again.
                  </ErrorDisplay>
                </div>
              </Form.CustomItem>
              <Form.Item
                label="Title"
                errorMessage={titleIsTouched ? errors?.title : undefined}
                isRequired
              >
                <Input
                  onChange={(e) => setTitle(e.target.value)}
                  onBlur={(e) => {
                    if (e.target.value !== '') {
                      setTitleIsTouched(true);
                    }
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Location"
                errorMessage={locationIsTouched ? errors?.location : undefined}
                isRequired
              >
                <Input
                  onChange={(e) => setLocation(e.target.value)}
                  onBlur={(e) => {
                    if (e.target.value !== '') {
                      setLocationIsTouched(true);
                    }
                  }}
                />
              </Form.Item>
              <Form.Item label="Description">
                <Input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Item>
              <Form.CustomItem>
                <div className={styles['FormErrorDisplay']}>
                  <ErrorDisplay
                    isShown={durationIsTouched && Boolean(errors?.duration)}
                  >
                    {errors?.duration!}
                  </ErrorDisplay>
                </div>
              </Form.CustomItem>
              <Form.Row>
                <Form.Item label="Hours" isRequired>
                  <Input
                    type="number"
                    min="0"
                    value={isNaN(hrs) ? '' : hrs}
                    onChange={(e) => setHrs(Math.abs(parseInt(e.target.value)))}
                    onBlur={() => {
                      setHrs((input) => {
                        if (isNaN(input)) {
                          return 0;
                        }

                        return input;
                      });

                      setDurationIsTouched(true);
                    }}
                  />
                </Form.Item>
                <Form.Item label="Minutes" isRequired>
                  <Input
                    type="number"
                    min="0"
                    max="60"
                    value={isNaN(mins) ? '' : mins}
                    onChange={(e) =>
                      setMins(Math.abs(parseInt(e.target.value)))
                    }
                    onBlur={() => {
                      setMins((input) => {
                        if (isNaN(input)) {
                          return 0;
                        }

                        if (input > 60) {
                          setHrs((hrs) => hrs + Math.floor(input / 60));

                          return input % 60;
                        }

                        return input;
                      });

                      setDurationIsTouched(true);
                    }}
                  />
                </Form.Item>
              </Form.Row>
              <Form.CustomItem>
                <div className={styles['FormText']}>
                  <p>
                    <Text>
                      Pick the time intervals in which your event can possibly
                      take place.
                    </Text>
                  </p>
                  <p>
                    <Text>
                      Participants will be able to narrow down these intervals
                      depending on their availability.
                    </Text>
                  </p>
                </div>
              </Form.CustomItem>
              <Form.CustomItem>
                <div className={styles['FormErrorDisplay']}>
                  <ErrorDisplay isShown={Boolean(errors?.intervals)}>
                    {errors?.intervals!}
                  </ErrorDisplay>
                </div>
              </Form.CustomItem>
              {intervals.map((_, index) => getRangePicker(index))}
              <Button elementProps={{ onClick: handleButtonClick }}>
                Create
              </Button>
            </Form.Column>
          </Form>
        </div>
      </Loader>
    </Page>
  );
};

export default NewEvent;
