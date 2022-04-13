import { useEffect, useState } from 'react';
import Dropdown from 'ui-kit/Dropdown';
import IconButton from 'ui-kit/IconButton';
import Menu from 'ui-kit/Menu';
import Switch from 'ui-kit/Switch';
import Text from 'components/Text';
import useBreakpointCheck from 'hooks/useBreakpointCheck';
import useEventList from '../../hooks/useEventList';
import styles from './FilterControls.module.scss';

interface IProps extends Pick<ReturnType<typeof useEventList>, 'filter'> {
  onFilterChange: ReturnType<typeof useEventList>['applyFilter'];
}

const FilterControls: React.VFC<IProps> = ({ filter, onFilterChange }) => {
  const bp = useBreakpointCheck();
  const align = bp('Mobile', 'Tablet') ? 'right' : 'center';

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(Boolean(filter.isOrganizer || filter.status));
  }, [filter.isOrganizer, filter.status]);

  const getSelectStatusMenuItem = (id: typeof filter.status, text: string) => {
    const handleMenuItemClick = () => {
      if (id !== filter.status) {
        onFilterChange({ status: id });
      }
    };

    return (
      <Menu.Item
        id={id || 'all'}
        icon={'Check'}
        iconIsShownOnlyIfSelected
        element="HTMLButton"
        elementProps={{ onClick: handleMenuItemClick }}
      >
        {text}
      </Menu.Item>
    );
  };

  return (
    <Dropdown
      align={align}
      width="wide"
      closeOnClick={false}
      trigger={<IconButton isHighlighted={isActive} icon="FilterList" />}
    >
      <Menu selectedId={filter.status || 'all'}>
        {getSelectStatusMenuItem(null, 'Show all')}
        {getSelectStatusMenuItem('pending', 'Pending')}
        {getSelectStatusMenuItem('past', 'Past')}
      </Menu>
      <Dropdown.Separator />
      <label className={styles['SwitchRow']}>
        <Text color="inherit">Hide created by others</Text>
        <Switch
          type="checkbox"
          checked={filter.isOrganizer !== null}
          onChange={(e) =>
            onFilterChange({ isOrganizer: e.target.checked || null })
          }
        />
      </label>
    </Dropdown>
  );
};

export default FilterControls;
