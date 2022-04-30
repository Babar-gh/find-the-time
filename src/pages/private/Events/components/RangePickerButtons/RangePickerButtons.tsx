import IconButton from 'ui-kit/IconButton';
import { Interval } from '../NewEventModal/types';
import styles from './RangePickerButtons.module.scss';

interface IProps {
  intervals: Interval[];
  onAddInterval: () => void;
  onRemoveInterval: () => void;
  index: number;
}

const RangePickerButtons: React.VFC<IProps> = ({
  intervals,
  onAddInterval,
  onRemoveInterval,
  index,
}) => {
  return (
    <div className={styles['Root']}>
      {intervals.length > 1 && (
        <IconButton
          icon="Remove"
          elementProps={{ onClick: onRemoveInterval }}
        />
      )}
      {index === intervals.length - 1 && (
        <IconButton icon="Add" elementProps={{ onClick: onAddInterval }} />
      )}
    </div>
  );
};

export default RangePickerButtons;
