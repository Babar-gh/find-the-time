import Dropdown from 'ui-kit/Dropdown';
import IconButton from 'ui-kit/IconButton';
import Menu from 'ui-kit/Menu';
import Separator from 'ui-kit/Separator';
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

  const getNonNullableId = (id: typeof filter.status) => id || 'all';

  const getSelectStatusMenuItem = (id: typeof filter.status, text: string) => {
    const handleMenuItemClick = () => {
      if (id !== filter.status) {
        onFilterChange({ status: id });
      }
    };

    return (
      <Menu.Item
        id={getNonNullableId(id)}
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
      trigger={
        <IconButton
          isHighlighted={Boolean(filter.isOrganizer || filter.status)}
          icon="FilterList"
        />
      }
    >
      <Menu selectedId={getNonNullableId(filter.status)}>
        {getSelectStatusMenuItem(null, 'Show all')}
        {getSelectStatusMenuItem('pending', 'Pending')}
        {getSelectStatusMenuItem('past', 'Past')}
      </Menu>
      <Separator context="dropdown" />
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
