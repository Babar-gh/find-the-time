import IconButton from 'ui-kit/IconButton';
import useTheme from 'App/hooks/useTheme';

interface IProps {
  theme: ReturnType<typeof useTheme>;
}

const ThemeSwitchButton: React.VFC<IProps> = ({ theme }) => {
  const [current, handleClick] = theme;

  const icon = current === 'dark' ? 'LightMode' : 'DarkMode';

  return <IconButton icon={icon} onClick={handleClick} />;
};

export default ThemeSwitchButton;
