import { CSSTransition } from 'react-transition-group';
import Text from 'components/Text';
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
      <p className={styles['Root']}>
        <Text font="primary">{children}</Text>
      </p>
    </CSSTransition>
  );
};

export default ErrorDisplay;
