import { useCallback, useEffect, useMemo, useState } from 'react';
import { THEME_STORAGE_KEY } from 'constants/localStorage';
import { dark, light } from 'App/styles/muiThemes';

type Theme = 'dark' | 'light';

const inferDefaultTheme = () => {
  const darkIsDefault = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches;

  return darkIsDefault ? 'dark' : 'light';
};

const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

    return storedTheme === 'dark' || storedTheme === 'light'
      ? storedTheme
      : inferDefaultTheme();
  });

  const muiTheme = useMemo(() => (theme === 'dark' ? dark : light), [theme]);

  const switchTheme = useCallback(() => {
    setTheme((currentTheme) => {
      return currentTheme === 'dark' ? 'light' : 'dark';
    });
  }, []);

  useEffect(() => {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  return {
    current: theme,
    muiCurrent: muiTheme,
    switch: switchTheme,
  };
};

export default useTheme;
