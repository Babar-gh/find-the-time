import CredentialsForm from 'components/CredentialsForm';
import LinkWrapper from 'components/LinkWrapper';
import Text from 'components/Text';
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
      ]}
    />
  );
};

export default Login;
