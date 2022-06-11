import { useState } from 'react';
import { validate } from 'validate.js';
import Button from 'ui-kit/Button';
import Form from 'ui-kit/Form';
import InfoTile from 'components/InfoTile';
import Input from 'ui-kit/Input';
import Modal from 'ui-kit/Modal';
import Page from 'ui-kit/Page';
import Text from 'components/Text';
import { changeUserName, refreshUserToken } from 'api/users';
import { updateFromNewToken } from 'store/slices/account';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { constraints, NameChangeValidation } from './constraints';
import styles from './Account.module.scss';

const Account: React.VFC = () => {
  const dispatch = useAppDispatch();

  const { email, name, isDemo } = useAppSelector((store) => store.account);
  const nameIsSpecified = name !== '';

  const [nameChangeModalIsOpen, setNameChangeModalIsOpen] = useState(false);
  const [nameInput, setNameInput] = useState(name);

  const [isLoading, setIsLoading] = useState(false);

  const errors: NameChangeValidation = validate(
    { name: nameInput },
    constraints
  );

  const handleModalOkClick = async () => {
    if (errors) {
      return;
    }

    setNameChangeModalIsOpen(false);

    setIsLoading(true);
    try {
      await changeUserName({ name: nameInput });

      const { data: tokenWithNewName } = await refreshUserToken();
      dispatch(updateFromNewToken(tokenWithNewName));
    } catch {
      // TODO: Add a proper error handling
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Page title="Your Account" isLoading={isLoading}>
      {nameChangeModalIsOpen && (
        <Modal
          title="Change Name"
          onOkClick={handleModalOkClick}
          onCancelClick={() => setNameChangeModalIsOpen(false)}
        >
          <Form defaultPreventedOnSubmission layout="responsive">
            <Form.Column>
              <Form.Item id="name" label="New Name" errorMessage={errors?.name}>
                <Input
                  value={nameInput}
                  onChange={({ target }) => setNameInput(target.value)}
                />
              </Form.Item>
            </Form.Column>
          </Form>
        </Modal>
      )}
      <div className={styles['Root']}>
        <InfoTile heading="Email" icon="Email">
          <Text>{email}</Text>
        </InfoTile>
        <InfoTile heading="Name" icon="Person">
          {nameIsSpecified ? (
            <Text>{name}</Text>
          ) : (
            <Text font="primaryItalic">Not specified</Text>
          )}
        </InfoTile>
        {isDemo && (
          <InfoTile heading="Demo" icon="Info">
            <Text>This is a demo account</Text>
          </InfoTile>
        )}
        <Button
          elementProps={{ onClick: () => setNameChangeModalIsOpen(true) }}
        >{`${nameIsSpecified ? 'Change' : 'Set'} name`}</Button>
      </div>
    </Page>
  );
};

export default Account;
