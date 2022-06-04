import dayjs, { Dayjs } from 'dayjs';
import validate from 'validate.js';
import { MouseEventHandler, useRef, useState } from 'react';
import { uniqueId } from 'lodash';
import { useNavigate } from 'react-router-dom';
import ErrorDisplay from 'ui-kit/ErrorDisplay';
import Form from 'ui-kit/Form';
import InfoDisplay from 'ui-kit/InfoDisplay';
import Input from 'ui-kit/Input';
import Loader from 'ui-kit/Loader';
import Modal from 'ui-kit/Modal';
import { createEvent } from 'api/events';
import { DATETIME_DEFAULT } from 'constants/formats';
import { PRIVATE } from 'constants/routes';
import {
  parsePositiveInt,
  treatNaNAsEmptyString,
  treatNaNAsZero,
} from 'utilities/numbers';
import styles from './NewEvent.module.scss';
import { constraints, NewEventValidation } from './constraints';
import { getRangePickers } from './helpers';
import { Interval } from './types';

const parseIntervalsForRequest = (intervals: Interval[]) =>
  intervals.map(({ start, end }) => ({
    start: start.format(DATETIME_DEFAULT),
    end: end.format(DATETIME_DEFAULT),
  }));

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
  const duration = treatNaNAsZero(hrs) * 60 + treatNaNAsZero(mins);
  const [durationIsTouched, setDurationIsTouched] = useState(false);

  const [intervals, setIntervals] = useState<Interval[]>([
    {
      start: dayjs().add(1, 'hour'),
      end: dayjs().add(3, 'hour'),
      key: uniqueId(),
    },
  ]);

  const errors: NewEventValidation = validate(
    { title, location, duration, intervals },
    constraints
  );

  const someIntervalsAreInvalid = useRef(true);

  const getAddIntervalHandler = (index: number) => () => {
    setIntervals((current) => {
      const updated = [...current];
      updated.push({
        start: dayjs(current[index].start).add(1, 'day'),
        end: dayjs(current[index].end).add(1, 'day'),
        key: uniqueId(),
      });

      return updated;
    });
  };

  const getRemoveIntervalHandler = (index: number) => () => {
    setIntervals((current) => {
      const updated = [...current];
      updated.splice(index, 1);

      return updated;
    });
  };

  const getStartPickerChangeHandler =
    (index: number) => (value: Dayjs | null) => {
      if (value) {
        setIntervals((current) => {
          const updated = [...current];
          updated[index].start = value;

          return updated;
        });
      }
    };

  const getEndPickerChangeHandler =
    (index: number) => (value: Dayjs | null) => {
      if (value) {
        setIntervals((current) => {
          const updated = [...current];
          updated[index].end = value;

          return updated;
        });
      }
    };

  const handleOkClick: MouseEventHandler = async (_e) => {
    if (errors || someIntervalsAreInvalid.current) {
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

      setIsLoading(false);
      setSubmitHasFailed(false);

      navigate(`${PRIVATE.Events}/${response.data.id}`);
    } catch {
      setIsLoading(false);
      setSubmitHasFailed(true);
    }
  };

  const returnToPage = () => navigate(PRIVATE.Events);

  return (
    <Modal
      title="Create a New Event"
      onOkClick={handleOkClick}
      okText="Create"
      onCancelClick={returnToPage}
      onCloseClick={returnToPage}
      onBackdropClick={returnToPage}
    >
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
                id="title"
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
                id="location"
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
              <Form.Item id="description" label="Description">
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
                <Form.Item id="hours" label="Hours" isRequired>
                  <Input
                    type="number"
                    min="0"
                    value={treatNaNAsEmptyString(hrs)}
                    onChange={(e) => setHrs(parsePositiveInt(e.target.value))}
                    onBlur={() => {
                      setHrs((input) => treatNaNAsZero(input));
                      setDurationIsTouched(true);
                    }}
                  />
                </Form.Item>
                <Form.Item id="minutes" label="Minutes" isRequired>
                  <Input
                    type="number"
                    min="0"
                    max="60"
                    value={treatNaNAsEmptyString(mins)}
                    onChange={(e) => setMins(parsePositiveInt(e.target.value))}
                    onBlur={() => {
                      setMins((input) => {
                        if (input > 60) {
                          setHrs((hrs) => hrs + Math.floor(input / 60));

                          return input % 60;
                        }

                        return treatNaNAsZero(input);
                      });

                      setDurationIsTouched(true);
                    }}
                  />
                </Form.Item>
              </Form.Row>
              <Form.CustomItem>
                <div className={styles['FormText']}>
                  <InfoDisplay>
                    {[
                      'Pick the time intervals in which your event can possibly take place.',
                      'Participants will be able to narrow down these intervals depending on their availability.',
                    ]}
                  </InfoDisplay>
                </div>
              </Form.CustomItem>
              <Form.CustomItem>
                <div className={styles['FormErrorDisplay']}>
                  <ErrorDisplay isShown={Boolean(errors?.intervals)}>
                    {errors?.intervals!}
                  </ErrorDisplay>
                </div>
              </Form.CustomItem>
              {intervals.map((_, intervalIndex) => (
                <Form.Row key={intervals[intervalIndex].key}>
                  {getRangePickers(
                    intervalIndex,
                    intervals,
                    duration,
                    someIntervalsAreInvalid,
                    getAddIntervalHandler,
                    getRemoveIntervalHandler,
                    getStartPickerChangeHandler,
                    getEndPickerChangeHandler
                  ).map(({ formItemProps, picker }, pickerIndex) => (
                    <Form.Item
                      {...formItemProps}
                      key={pickerIndex}
                      id={`picker-${intervalIndex}-${pickerIndex}`}
                    >
                      {picker}
                    </Form.Item>
                  ))}
                </Form.Row>
              ))}
            </Form.Column>
          </Form>
        </div>
      </Loader>
    </Modal>
  );
};

export default NewEvent;
