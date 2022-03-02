import { useCallback, useEffect, useState } from 'react';
import { THEME_STORAGE_KEY } from 'constants/localStorage';

type Theme = 'dark' | 'light';

const inferDefaultTheme = () => {
  const darkIsDefault = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches;

  return darkIsDefault ? 'dark' : 'light';
};

const useTheme = (): [Theme, () => void] => {
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

    return storedTheme === 'dark' || storedTheme === 'light'
      ? storedTheme
      : inferDefaultTheme();
  });

  const switchTheme = useCallback(() => {
    setTheme((currentTheme) => {
      return currentTheme === 'dark' ? 'light' : 'dark';
    });
  }, []);

  useEffect(() => {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  return [theme, switchTheme];
};

export default useTheme;
