import { useState } from 'react';
import Backdrop from 'ui-kit/Backdrop';
import IconButton from 'ui-kit/IconButton';
import Menu from 'ui-kit/Menu';
import useEventList from '../../hooks/useEventList';
import styles from './SortByMenu.module.scss';

interface IProps extends Pick<ReturnType<typeof useEventList>, 'sorter'> {
  onSorterChange: ReturnType<typeof useEventList>['applySorter'];
}

const SortByMenu: React.VFC<IProps> = ({ sorter, onSorterChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const getMenuItem = (id: typeof sorter.sortBy, text: string) => {
    return (
      <Menu.Item
        id={id}
        icon={'Check'}
        iconIsShownOnlyIfSelected
        element="HTMLButton"
        elementProps={{
          onClick: () => {
            if (id !== sorter.sortBy) {
              onSorterChange({ sortBy: id });
            }
          },
        }}
      >
        {text}
      </Menu.Item>
    );
  };

  return (
    <div onClick={() => setIsOpen((current) => !current)}>
      <IconButton icon="SortByAlpha" isPressed={isOpen} />
      <Backdrop isOpen={isOpen} theme="transparent" withoutPortal>
        <div className={styles['Container']}>
          <Menu selectedId={sorter.sortBy}>
            {getMenuItem('created', 'Created on')}
            {getMenuItem('chosenInterval', 'Scheduled for')}
            {getMenuItem('subscriptions', 'Possible start')}
          </Menu>
        </div>
      </Backdrop>
    </div>
  );
};

export default SortByMenu;
