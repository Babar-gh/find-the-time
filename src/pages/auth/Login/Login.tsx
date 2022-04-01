import CredentialsForm from 'components/CredentialsForm';
import LinkWrapper from 'components/LinkWrapper';
import Text from 'components/Text';
import { AUTH } from 'constants/routes';
import { signIn } from 'store/slices/account';

const Login: React.VFC = () => {
  return (
    <CredentialsForm
      actionToDispatch={signIn}
      headingText="Sign In"
      errorText="The email or password that you have entered is incorrect."
      buttonText="Sign in"
      bottomAddons={[
        <>
          <Text>Need an account? </Text>
          {/* TODO: Replace with a proper <Link> component */}
          <LinkWrapper type="RouterLink" to={AUTH.Registration}>
            <Text>Sign up!</Text>
          </LinkWrapper>
        </>,
        <>
          {/* TODO: Replace with a proper <Link> component */}
          <LinkWrapper type="RouterLink" to={AUTH.ResetPassword}>
            <Text>Forgot your password?</Text>
          </LinkWrapper>
        </>,
      ]}
    />
  );
};

export default Login;
