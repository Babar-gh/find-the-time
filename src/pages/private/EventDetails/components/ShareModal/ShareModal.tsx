import Input from 'ui-kit/Input';
import Modal from 'ui-kit/Modal';

interface IProps {
  onCopy: () => void;
  onCancel: () => void;
}

const ShareModal: React.VFC<IProps> = ({ onCopy, onCancel }) => {
  const eventUrl = window.location.href;

  return (
    <Modal
      title="Invite Participants"
      onOkClick={() => {
        navigator.clipboard.writeText(eventUrl);
        onCopy();
      }}
      okText="Copy"
      onCancelClick={onCancel}
    >
      <Input icon="Share" value={eventUrl} />
    </Modal>
  );
};

export default ShareModal;
