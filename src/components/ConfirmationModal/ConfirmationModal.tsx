import Text from 'components/Text';
import Modal from 'ui-kit/Modal';

interface IProps {
  title?: string;
  action: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDangerous?: boolean;
}

const ConfirmationModal: React.VFC<IProps> = ({
  title = 'Confirm Action',
  action,
  onConfirm,
  onCancel,
  isDangerous = false,
}) => (
  <Modal
    title={title}
    onOkClick={onConfirm}
    okProps={isDangerous ? { theme: 'danger' } : undefined}
    onCancelClick={onCancel}
  >
    <Text>You are about to {action}. Do you want to proceed?</Text>
  </Modal>
);

export default ConfirmationModal;
