import Dropdown from 'ui-kit/Dropdown';
import IconButton from 'ui-kit/IconButton';
import Menu from 'ui-kit/Menu';
import Separator from 'ui-kit/Separator';
import Switch from 'ui-kit/Switch';
import useBreakpointCheck from 'hooks/useBreakpointCheck';
import useEventList from '../../hooks/useEventList';

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

  const governedByThisControl = [filter.isOrganizer, filter.status];
  const isHighlighted = governedByThisControl.some((filter) => filter !== null);

  return (
    <Dropdown
      align={align}
      width="wide"
      closeOnClick={false}
      trigger={<IconButton icon="FilterList" {...{ isHighlighted }} />}
    >
      <Menu selectedId={getNonNullableId(filter.status)}>
        {getSelectStatusMenuItem(null, 'Show all')}
        {getSelectStatusMenuItem('pending', 'Pending')}
        {getSelectStatusMenuItem('past', 'Past')}
      </Menu>
      <Separator context="dropdown" />
      <Switch
        label="Hide created by others"
        checked={filter.isOrganizer !== null}
        onChange={(e) =>
          onFilterChange({ isOrganizer: e.target.checked || null })
        }
      />
    </Dropdown>
  );
};

export default FilterControls;
