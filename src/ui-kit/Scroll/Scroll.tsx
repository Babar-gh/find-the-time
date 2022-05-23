import classNames from 'classnames/bind';
import { useState } from 'react';
import useIntersection from 'hooks/useIntersection';
import styles from './Scroll.module.scss';

interface IProps {
  axis?: 'vertical' | 'horizontal';
}

const cn = classNames.bind(styles);

const Scroll: React.FC<IProps> = ({ axis = 'vertical', children }) => {
  const rootClassName = cn('Root', `Root_axis_${axis}`);

  const [leftEdgeIsShaded, setLeftEdgeIsShaded] = useState(false);
  const [rightEdgeIsShaded, setRightEdgeIsShaded] = useState(false);

  const { setSentinelRef: setLeftSentinelRef } = useIntersection(
    () => setLeftEdgeIsShaded(false),
    () => setLeftEdgeIsShaded(true)
  );
  const { setSentinelRef: setRightSentinelRef } = useIntersection(
    () => setRightEdgeIsShaded(false),
    () => setRightEdgeIsShaded(true)
  );

  if (axis === 'vertical') {
    return <div className={rootClassName}>{children}</div>;
  }

  return (
    <div className={styles['ShadingWrapper']}>
      {leftEdgeIsShaded && <div className={styles['LeftShading']} />}
      {rightEdgeIsShaded && <div className={styles['RightShading']} />}
      <div className={rootClassName}>
        <div className={styles['SentinelWrapper']}>
          <div className={styles['LeftSentinel']} ref={setLeftSentinelRef} />
          <div className={styles['RightSentinel']} ref={setRightSentinelRef} />
          {children}
        </div>
      </div>
    </div>
  );
};

export default Scroll;
