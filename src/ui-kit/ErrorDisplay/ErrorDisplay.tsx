import { CSSTransition } from 'react-transition-group';
import InfoDisplay from 'ui-kit/InfoDisplay';
import styles from './ErrorDisplay.module.scss';

interface IProps {
  isShown: boolean;
  children: string;
}

const getTransitionClassName = () => {
  const root = 'Root_transition';

  return {
    enter: styles[`${root}_enter`],
    enterActive: styles[`${root}_enterActive`],
    exit: styles[`${root}_exit`],
    exitActive: styles[`${root}_exitActive`],
  };
};

const ErrorDisplay: React.FC<IProps> = ({ isShown, children }) => {
  return (
    <CSSTransition
      in={isShown}
      timeout={500}
      classNames={getTransitionClassName()}
      unmountOnExit
    >
      <div className={styles['Root']}>
        <InfoDisplay theme="danger" height="fill" clamp={2}>
          {children}
        </InfoDisplay>
      </div>
    </CSSTransition>
  );
};

export default ErrorDisplay;
