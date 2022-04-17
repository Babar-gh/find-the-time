import { useEffect } from 'react';
import bodyStyles from '../styles/Body.module.scss';
import useTheme from './useTheme';

const useThemeUpdate = (theme: ReturnType<typeof useTheme>) => {
  useEffect(() => {
    document.body.className = bodyStyles[`Root_theme_${theme.current}`];
  }, [theme]);
};

export default useThemeUpdate;
