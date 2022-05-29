import Input from 'ui-kit/Input';
import Modal from 'ui-kit/Modal';

interface IProps {
  isOpen: boolean;
  onCopy: () => void;
  onCancel: () => void;
}

const ShareModal: React.VFC<IProps> = ({ isOpen, onCopy, onCancel }) => {
  const eventUrl = window.location.href;

  return (
    <Modal
      title="Invite Participants"
      isOpen={isOpen}
      onOkClick={() => {
        navigator.clipboard.writeText(eventUrl);
        onCopy();
      }}
      okText="Copy"
      onCancelClick={onCancel}
      onCloseClick={onCancel}
      onBackdropClick={onCancel}
    >
      <Input icon="Share" value={eventUrl} />
    </Modal>
  );
};

export default ShareModal;
