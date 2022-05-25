import { ComponentProps } from 'react';
import { Dayjs } from 'dayjs';
import DatePicker from 'ui-kit/DatePicker';
import Modal from 'ui-kit/Modal';
import Text from 'components/Text';
import { DATETIME_PICKER } from 'constants/formats';
import styles from './IntervalChoiceModal.module.scss';
import Input from 'ui-kit/Input';

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
    <div className={styles['Row']}>
      <Text>Start: </Text>
      <DatePicker {...pickerProps} />
    </div>
    {eventEnd && (
      <div className={styles['Row']}>
        <Text>End: </Text>
        <Input placeholder={eventEnd.format(DATETIME_PICKER)} disabled />
      </div>
    )}
  </Modal>
);

export default IntervalChoiceModal;
