import validate from 'validate.js';
import { MouseEventHandler, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as jwt from 'jwt';
import Button from 'ui-kit/Button';
import ErrorDisplay from 'ui-kit/ErrorDisplay';
import Form from 'ui-kit/Form';
import Input from 'ui-kit/Input';
import LinkWrapper from 'components/LinkWrapper';
import Logo from 'components/Logo';
import Text from 'components/Text';
import { signIn } from 'store/slices/account';
import { useAppDispatch } from 'store/hooks';
import styles from './Login.module.scss';

type ValidationErrors = { email?: string; password?: string } | undefined;
type LocationState = { returnUrl?: string } | null;

const LoginForm: React.VFC = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [emailIsTouched, setEmailIsTouched] = useState(false);

  const [password, setPassword] = useState('');
  const [passwordIsTouched, setPasswordIsTouched] = useState(false);

  const [loginHasFailed, setLoginHasFailed] = useState(false);

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

  const handleSignInButtonClick: MouseEventHandler = (_e) => {
    if (errors) {
      setEmailIsTouched(true);
      setPasswordIsTouched(true);

      return;
    }

    dispatch(signIn({ email, password }));

    if (jwt.checkIfExists()) {
      const { returnUrl } = (location.state as LocationState) || {};

      // TODO: add enum for all the different routes
      navigate(returnUrl || '/events');
    } else {
      setLoginHasFailed(true);
    }
  };

  const logo = (
    <div className={styles['LogoContainer']}>
      <Logo />
    </div>
  );

  const heading = (
    <h2 className={styles['Heading']}>
      <Text size="big" color="secondary">
        Sign in
      </Text>
    </h2>
  );

  const errorDisplay = (
    <ErrorDisplay isShown={loginHasFailed}>
      The email or password that you have entered is incorrect.
    </ErrorDisplay>
  );

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
              onClick: handleSignInButtonClick,
            }}
          >
            Sign in
          </Button>
          <Button
            elementProps={{
              onClick: () => setLoginHasFailed((current) => !current),
            }}
          >
            Do some magic!
          </Button>
        </Form.Column>
      </Form>
    </div>
  );

  const links = (
    <div className={styles['Links']}>
      <p className={styles['LinkContainer']}>
        <Text>Need an account? </Text>
        {
          // TODO: Replace with a proper <Link> component,
          //       add enum for all the different routes
        }
        <LinkWrapper type="RouterLink" to={'/register'}>
          <Text>Sign up!</Text>
        </LinkWrapper>
      </p>
      <p className={styles['LinkContainer']}>
        {
          // TODO: Replace with a proper <Link> component,
          //       add enum for all the different routes
        }
        <LinkWrapper type="RouterLink" to={'/reset-password'}>
          <Text>Forgot your password?</Text>
        </LinkWrapper>
      </p>
    </div>
  );

  return (
    <div className={styles['Root']}>
      {logo}
      {heading}
      {errorDisplay}
      {form}
      {links}
    </div>
  );
};

export default LoginForm;
