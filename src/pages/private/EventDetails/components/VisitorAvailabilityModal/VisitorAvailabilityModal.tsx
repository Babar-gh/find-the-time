import validate from 'validate.js';
import { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import DatePicker from 'ui-kit/DatePicker';
import ErrorDisplay from 'ui-kit/ErrorDisplay';
import Form from 'ui-kit/Form';
import Modal from 'ui-kit/Modal';
import { TimeInterval } from 'types/common';
import getValidationConstraints, {
  VisitorAvailabilityValidation,
} from './constraints';

interface IProps {
  isOpen: boolean;
  onConfirm: (availabile: TimeInterval) => void;
  onCancel: () => void;
  constraints: TimeInterval;
  currentAvailabilities: TimeInterval[];
  duration: number;
}

const VisitorAvailabilityModal: React.VFC<IProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  constraints,
  currentAvailabilities,
  duration,
}) => {
  const [start, setStart] = useState<Dayjs | null>(null);
  const [end, setEnd] = useState<Dayjs | null>(null);

  useEffect(() => {
    if (start === null) {
      setStart(
        currentAvailabilities.at(-1)?.end.add(1, 'minute') || constraints.start
      );

      if (end === null) {
        setEnd(constraints.end);
      }
    }
  }, [start, end, constraints.start, constraints.end, currentAvailabilities]);

  const picked = start && end ? { start, end } : null;

  const validationattributes = {
    start: picked,
    end: picked,
    intervals: [...currentAvailabilities, picked],
  };

  const errors: VisitorAvailabilityValidation = picked
    ? validate(validationattributes, getValidationConstraints(duration))
    : undefined;

  const handleOkClick = () => {
    if (!picked) {
      return;
    }

    onConfirm(picked);

    setStart(null);
    setEnd(null);
  };

  return (
    <Modal
      title="Choose When You're Available"
      isOpen={isOpen}
      onOkClick={handleOkClick}
      onCancelClick={onCancel}
      onCloseClick={onCancel}
      onBackdropClick={onCancel}
    >
      <ErrorDisplay isShown={Boolean(errors?.intervals)}>
        {errors?.intervals || ''}
      </ErrorDisplay>
      <Form defaultPreventedOnSubmission layout="responsive">
        <Form.Column>
          <Form.Item label="Start" errorMessage={errors?.start} isRequired>
            <DatePicker
              value={start}
              onChange={setStart}
              constraints={constraints}
            />
          </Form.Item>
          <Form.Item label="End" errorMessage={errors?.end} isRequired>
            <DatePicker
              value={end}
              onChange={setEnd}
              constraints={constraints}
            />
          </Form.Item>
        </Form.Column>
      </Form>
    </Modal>
  );
};

export default VisitorAvailabilityModal;
