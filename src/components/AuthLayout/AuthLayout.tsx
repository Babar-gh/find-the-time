import Logo from 'components/Logo';
import ThemeSwitchButton from 'components/ThemeSwitchButton';
import useTheme from 'App/hooks/useTheme';
import styles from './AuthLayout.module.scss';

interface IProps {
  theme: ReturnType<typeof useTheme>;
}

const AuthLayout: React.FC<IProps> = ({ theme, children }) => {
  return (
    <div className={styles['Root']}>
      <div className={styles['SwitchThemeButtonContainer']}>
        <ThemeSwitchButton theme={theme} />
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
