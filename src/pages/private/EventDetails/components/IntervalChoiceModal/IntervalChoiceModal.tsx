import { ComponentProps } from 'react';
import { Dayjs } from 'dayjs';
import DatePicker from 'ui-kit/DatePicker';
import Form from 'ui-kit/Form';
import Input from 'ui-kit/Input';
import Modal from 'ui-kit/Modal';
import { DATETIME_PICKER } from 'constants/formats';

interface IProps {
  isOpen: boolean;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
  pickerProps: ComponentProps<typeof DatePicker>;
  eventEnd: Dayjs | null;
}

const IntervalChoiceModal: React.VFC<IProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  pickerProps,
  eventEnd,
}) => (
  <Modal
    title="Choose When Event Happens"
    isOpen={isOpen}
    onOkClick={onConfirm}
    onCancelClick={onCancel}
    onCloseClick={onCancel}
    onBackdropClick={onCancel}
  >
    <Form defaultPreventedOnSubmission layout="responsive">
      <Form.Column>
        <Form.Item id="start" label="Start" isRequired>
          <DatePicker {...pickerProps} />
        </Form.Item>
        <Form.Item id="end" label="End">
          <Input placeholder={eventEnd?.format(DATETIME_PICKER)} disabled />
        </Form.Item>
      </Form.Column>
    </Form>
  </Modal>
);

export default IntervalChoiceModal;
