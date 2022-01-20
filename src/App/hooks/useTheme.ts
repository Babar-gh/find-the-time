import useLocalStorage from 'use-local-storage';

type Theme = 'dark' | 'light';

const useTheme = (): [Theme, () => void] => {
  const darkIsDefault = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches;
  const defaultTheme = darkIsDefault ? 'dark' : 'light';

  const [theme, setTheme] = useLocalStorage<Theme>('theme', defaultTheme);

  const switchTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  return [theme, switchTheme];
};

export default useTheme;
