import { useState } from 'react';
import Button from 'ui-kit/Button';
import DummyContent from 'ui-kit/DummyContent';
import Modal from 'ui-kit/Modal';
import Page from 'ui-kit/Page';
import Text from 'components/Text';

const DummyPage: React.FC = () => {
  type Variant = 'simple' | 'extended';

  const [demoModalIsOpen, setDemoModalIsOpen] = useState<Variant | null>(null);

  const showModal = (variant: Variant) => setDemoModalIsOpen(variant);
  const hideModal = () => setDemoModalIsOpen(null);

  return (
    <Page title="I’m an Example Page">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Text>Basic button configuration</Text>
        <Button elementProps={{ onClick: () => showModal('simple') }}>
          Show Modal
        </Button>
        <Modal
          isOpen={demoModalIsOpen === 'simple'}
          onOkButtonClick={hideModal}
          onCancelButtonClick={hideModal}
          onBackdropClick={hideModal}
        >
          <DummyContent />
        </Modal>
        <Text>Extended button configuration</Text>
        <Button elementProps={{ onClick: () => showModal('extended') }}>
          Show Modal
        </Button>
        <Modal
          isOpen={demoModalIsOpen === 'extended'}
          onOkButtonClick={() =>
            alert('Told ya! No right at all. Press the dog ↓')
          }
          okButtonText="O you don't have the right!"
          okButtonProps={{ leftIcon: 'ArrowDownward' }}
          onCancelButtonClick={hideModal}
          cancelButtonText="Dog"
          cancelButtonProps={{
            rightIcon: 'Logout',
            theme: 'danger',
            element: 'Link',
            elementProps: {
              type: 'HTMLAnchor',
              href: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            },
          }}
          onBackdropClick={hideModal}
        >
          <DummyContent />
        </Modal>
      </div>
    </Page>
  );
};

export default DummyPage;
