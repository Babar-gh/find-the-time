import Text from 'components/Text';
import Modal from 'ui-kit/Modal';

interface IProps {
  title?: string;
  action: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.VFC<IProps> = ({
  title = 'Confirm Action',
  action,
  onConfirm,
  onCancel,
}) => (
  <Modal
    title={title}
    onOkClick={onConfirm}
    onCancelClick={onCancel}
    onCloseClick={onCancel}
    onBackdropClick={onCancel}
  >
    <Text>You are about to {action}. Do you want to proceed?</Text>
  </Modal>
);

export default ConfirmationModal;
