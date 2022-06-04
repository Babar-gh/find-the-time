import validate from 'validate.js';
import { Dayjs } from 'dayjs';
import { useState } from 'react';
import DatePicker from 'ui-kit/DatePicker';
import ErrorDisplay from 'ui-kit/ErrorDisplay';
import Form from 'ui-kit/Form';
import Modal from 'ui-kit/Modal';
import { TimeInterval } from 'types/common';
import { getInitialStart } from './helpers';
import getValidationConstraints, {
  VisitorAvailabilityValidation,
} from './constraints';

interface IProps {
  onConfirm: (availabile: TimeInterval) => void;
  onCancel: () => void;
  constraints: TimeInterval;
  currentAvailabilities: TimeInterval[];
  duration: number;
}

const VisitorAvailabilityModal: React.VFC<IProps> = ({
  onConfirm,
  onCancel,
  constraints,
  currentAvailabilities,
  duration,
}) => {
  const [start, setStart] = useState<Dayjs | null>(
    getInitialStart(constraints, currentAvailabilities)
  );
  const [end, setEnd] = useState<Dayjs | null>(constraints.end);

  const pickedInterval = start && end ? { start, end } : null;

  const validationattributes = {
    start: pickedInterval,
    end: pickedInterval,
    intervals: [...currentAvailabilities, pickedInterval],
  };

  const errors: VisitorAvailabilityValidation = pickedInterval
    ? validate(validationattributes, getValidationConstraints(duration))
    : undefined;

  const handleOkClick = () => {
    if (!pickedInterval || errors) {
      return;
    }

    onConfirm(pickedInterval);
  };

  return (
    <Modal
      title="Choose When You're Available"
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
          <Form.Item
            id="start"
            label="Start"
            errorMessage={errors?.start}
            isRequired
          >
            <DatePicker
              value={start}
              onChange={setStart}
              constraints={constraints}
            />
          </Form.Item>
          <Form.Item id="end" label="End" errorMessage={errors?.end} isRequired>
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
