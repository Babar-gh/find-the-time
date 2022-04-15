import CredentialsForm from 'components/CredentialsForm';
import Link from 'ui-kit/Link';
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
          <Link type="RouterLink" to={AUTH.Registration}>
            Sign up!
          </Link>
        </>,
        <>
          <Link type="RouterLink" to={AUTH.ResetPassword}>
            Forgot your password?
          </Link>
        </>,
      ]}
    />
  );
};

export default Login;
