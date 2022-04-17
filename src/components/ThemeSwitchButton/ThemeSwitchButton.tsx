import IconButton from 'ui-kit/IconButton';
import useTheme from 'App/hooks/useTheme';

interface IProps {
  theme: ReturnType<typeof useTheme>;
  isHighlighted?: boolean;
}

const ThemeSwitchButton: React.VFC<IProps> = ({ theme, isHighlighted }) => {
  const icon = theme.current === 'dark' ? 'LightMode' : 'DarkMode';

  return (
    <IconButton
      elementProps={{ onClick: theme.switch }}
      {...{ icon, isHighlighted }}
    />
  );
};

export default ThemeSwitchButton;
