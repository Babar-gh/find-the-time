import validate from 'validate.js';
import { cloneElement, MouseEventHandler, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as jwt from 'jwt';
import Button from 'ui-kit/Button';
import ErrorDisplay from 'ui-kit/ErrorDisplay';
import Form from 'ui-kit/Form';
import Input from 'ui-kit/Input';
import LinkWrapper from 'components/LinkWrapper';
import Loader from 'ui-kit/Loader';
import Text from 'components/Text';
import { LocationState } from 'types/location';
import { signIn, signUp } from 'store/slices/account';
import { useAppDispatch } from 'store/hooks';
import styles from './CredentialsForm.module.scss';

interface IProps {
  type: 'login' | 'registration';
}

type ValidationErrors = { email?: string; password?: string } | undefined;

const CredentialsForm: React.VFC<IProps> = ({ type }) => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [emailIsTouched, setEmailIsTouched] = useState(false);

  const [password, setPassword] = useState('');
  const [passwordIsTouched, setPasswordIsTouched] = useState(false);

  const [submitHasFailed, setSubmitHasFailed] = useState(false);

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

  const errors: ValidationErrors = validate({ email, password }, constraints);

  let action: typeof signIn | typeof signUp,
    headingText: string,
    errorText: string,
    buttonText: string,
    links: JSX.Element[];

  switch (type) {
    case 'login':
      action = signIn;
      headingText = 'Sign In';
      errorText = 'The email or password that you have entered is incorrect.';
      buttonText = 'Sign in';
      links = [
        <>
          <Text>Need an account? </Text>
          {/* TODO: Replace with a proper <Link> component, add enum for all the different routes */}
          <LinkWrapper type="RouterLink" to={'/register'}>
            <Text>Sign up!</Text>
          </LinkWrapper>
        </>,
        <>
          {/* TODO: Replace with a proper <Link> component, add enum for all the different routes */}
          <LinkWrapper type="RouterLink" to={'/reset-password'}>
            <Text>Forgot your password?</Text>
          </LinkWrapper>
        </>,
      ];
      break;

    case 'registration':
      action = signUp;
      headingText = 'Sign Up';
      errorText = 'Please try a different email address.';
      buttonText = 'Sign up';
      links = [
        <>
          <Text>Already have an account? </Text>
          {/* TODO: Replace with a proper <Link> component, add enum for all the different routes */}
          <LinkWrapper type="RouterLink" to={'/login'}>
            <Text>Sign in!</Text>
          </LinkWrapper>
        </>,
        <>
          {/* TODO: Replace with a proper <Link> component, add enum for all the different routes */}
          <LinkWrapper type="RouterLink" to={'/reset-password'}>
            <Text>Forgot your password?</Text>
          </LinkWrapper>
        </>,
      ];
      break;
  }

  const handleButtonClick: MouseEventHandler = async (_e) => {
    if (errors) {
      setEmailIsTouched(true);
      setPasswordIsTouched(true);

      return;
    }

    setIsLoading(true);

    await dispatch(action({ email, password }));

    if (jwt.checkIfExists()) {
      const { returnUrl } = (location.state as LocationState) || {};

      // TODO: add enum for all the different routes
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
        <div className={styles['Links']}>
          {links.map((link) => (
            <p className={styles['LinkContainer']}>{cloneElement(link)}</p>
          ))}
        </div>
      </div>
    </Loader>
  );
};

export default CredentialsForm;
