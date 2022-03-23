import LoginForm from 'components/Login';
import Button from 'ui-kit/Button';
import styles from './AuthLayout.module.scss';

interface IProps {
  onThemeSwitch: () => void;
}

const AuthLayout: React.VFC<IProps> = ({ onThemeSwitch }) => {
  return (
    <div className={styles['Root']}>
      <LoginForm />
      <div className={styles['ThemeButtonContainer']}>
        <Button elementProps={{ onClick: onThemeSwitch }}>Switch theme</Button>
      </div>
    </div>
  );
};

export default AuthLayout;
