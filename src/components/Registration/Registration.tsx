import CredentialsForm from 'components/CredentialsForm';
import LinkWrapper from 'components/LinkWrapper';
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
          {/* TODO: Replace with a proper <Link> component */}
          <LinkWrapper type="RouterLink" to={AUTH.Login}>
            <Text>Sign in!</Text>
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

export default Registration;
