import validate from 'validate.js';
import { cloneElement, MouseEventHandler, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as jwt from 'jwt';
import Button from 'ui-kit/Button';
import ErrorDisplay from 'ui-kit/ErrorDisplay';
import Form from 'ui-kit/Form';
import Input from 'ui-kit/Input';
import Loader from 'ui-kit/Loader';
import Text from 'components/Text';
import { LocationState } from 'types/location';
import { signIn, signUp } from 'store/slices/account';
import { useAppDispatch } from 'store/hooks';
import styles from './CredentialsForm.module.scss';

interface IProps {
  actionToDispatch: typeof signIn | typeof signUp;
  headingText: string;
  errorText: string;
  buttonText: string;
  bottomAddons: JSX.Element[];
}

const constraints = {
  email: {
    email: { message: 'is not valid' },
  },
  password: {
    length: {
      minimum: 3,
      max: 32,
    },
  },
};

type ValidationErrors = { email?: string; password?: string } | undefined;

const CredentialsForm: React.VFC<IProps> = ({
  actionToDispatch,
  headingText,
  errorText,
  buttonText,
  bottomAddons,
}) => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [emailIsTouched, setEmailIsTouched] = useState(false);

  const [password, setPassword] = useState('');
  const [passwordIsTouched, setPasswordIsTouched] = useState(false);

  const [submitHasFailed, setSubmitHasFailed] = useState(false);

  const errors: ValidationErrors = validate({ email, password }, constraints);

  const handleButtonClick: MouseEventHandler = async (_e) => {
    if (errors) {
      setEmailIsTouched(true);
      setPasswordIsTouched(true);

      return;
    }

    setIsLoading(true);

    await dispatch(actionToDispatch({ email, password }));

    if (jwt.checkIfExists()) {
      const { returnUrl } = (location.state as LocationState) || {};

      navigate(returnUrl || '/');
      setSubmitHasFailed(false);
    } else {
      setSubmitHasFailed(true);
    }

    setIsLoading(false);
  };

  const form = (
    <div className={styles['FormContainer']}>
      <Form defaultPreventedOnSubmission layout="vertical">
        <Form.Column>
          <Form.Item
            label="Email"
            errorMessage={emailIsTouched ? errors?.email : undefined}
          >
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={(e) => {
                if (e.target.value !== '') {
                  setEmailIsTouched(true);
                }
              }}
              autoComplete="username"
            />
          </Form.Item>
          <Form.Item
            label="Password"
            errorMessage={passwordIsTouched ? errors?.password : undefined}
          >
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={(e) => {
                if (e.target.value !== '') {
                  setPasswordIsTouched(true);
                }
              }}
              type="password"
              autoComplete="current-password"
            />
          </Form.Item>
          <Button
            elementProps={{
              onClick: handleButtonClick,
            }}
          >
            {buttonText}
          </Button>
        </Form.Column>
      </Form>
    </div>
  );

  return (
    <Loader isShown={isLoading}>
      <div className={styles['Root']}>
        <h2 className={styles['Heading']}>
          <Text size="big" color="secondary">
            {headingText}
          </Text>
        </h2>
        <ErrorDisplay isShown={submitHasFailed}>{errorText}</ErrorDisplay>
        {form}
        <div className={styles['BottomAddonContainer']}>
          {bottomAddons.map((addon, index) => (
            <p className={styles['BottomAddon']} key={index}>
              {cloneElement(addon)}
            </p>
          ))}
        </div>
      </div>
    </Loader>
  );
};

export default CredentialsForm;
