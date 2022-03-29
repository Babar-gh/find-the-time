import Logo from 'components/Logo';
import Button from 'ui-kit/Button';
import styles from './AuthLayout.module.scss';

interface IProps {
  onThemeSwitch: () => void;
}

const AuthLayout: React.FC<IProps> = ({ onThemeSwitch, children }) => {
  return (
    <div className={styles['Root']}>
      <div className={styles['ThemeButtonContainer']}>
        <Button elementProps={{ onClick: onThemeSwitch }}>Switch theme</Button>
      </div>
      <div className={styles['ContentContainer']}>
        <div className={styles['LogoContainer']}>
          <Logo />
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
