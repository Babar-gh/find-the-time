import IconButton from 'ui-kit/IconButton';
import useTheme from 'App/hooks/useTheme';

interface IProps {
  theme: ReturnType<typeof useTheme>;
  isHighlighted?: boolean;
}

const ThemeSwitchButton: React.VFC<IProps> = ({ theme, isHighlighted }) => {
  const [current, handleClick] = theme;

  const icon = current === 'dark' ? 'LightMode' : 'DarkMode';

  return (
    <IconButton
      elementProps={{ onClick: handleClick }}
      {...{ icon, isHighlighted }}
    />
  );
};

export default ThemeSwitchButton;
