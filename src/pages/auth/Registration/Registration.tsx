import CredentialsForm from 'components/CredentialsForm';
import Link from 'ui-kit/Link';
import Text from 'components/Text';
import { AUTH } from 'constants/routes';
import { signUp } from 'store/slices/account';

const Registration: React.VFC = () => {
  return (
    <CredentialsForm
      actionToDispatch={signUp}
      headingText="Sign Up"
      errorText="Please try a different email address."
      buttonText="Sign up"
      bottomAddons={[
        <>
          <Text>Already have an account? </Text>
          <Link type="RouterLink" to={AUTH.Login}>
            <Text>Sign in!</Text>
          </Link>
        </>,
        <>
          <Link type="RouterLink" to={AUTH.ResetPassword}>
            <Text>Forgot your password?</Text>
          </Link>
        </>,
      ]}
    />
  );
};

export default Registration;
