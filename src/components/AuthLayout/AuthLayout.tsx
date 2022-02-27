import Text from 'components/Text';
import styles from './AuthLayout.module.scss';

interface IProps {
  onThemeSwitch: () => void;
}

const AuthLayout: React.VFC<IProps> = ({ onThemeSwitch }) => {
  const temporarySwitchThemeButton = (
    <button onClick={onThemeSwitch} className={styles['ThemeButtonContainer']}>
      Switch theme
    </button>
  );

  return (
    <div className={styles['Root']}>
      <Text>A login form goes here.</Text>
      {temporarySwitchThemeButton}
    </div>
  );
};

export default AuthLayout;
