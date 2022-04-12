import Dropdown from 'ui-kit/Dropdown';
import IconButton from 'ui-kit/IconButton';
import Menu from 'ui-kit/Menu';
import useBreakpointCheck from 'hooks/useBreakpointCheck';
import useEventList from '../../hooks/useEventList';

interface IProps extends Pick<ReturnType<typeof useEventList>, 'sorter'> {
  onSorterChange: ReturnType<typeof useEventList>['applySorter'];
}

const SortByMenu: React.VFC<IProps> = ({ sorter, onSorterChange }) => {
  const bp = useBreakpointCheck();
  const align = bp('Mobile') ? 'right' : 'center';

  const getMenuItem = (id: typeof sorter.sortBy, text: string) => {
    const handleMenuItemClick = () => {
      if (id !== sorter.sortBy) {
        onSorterChange({ sortBy: id });
      }
    };

    return (
      <Menu.Item
        id={id}
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
    <Dropdown align={align} trigger={<IconButton icon="SortByAlpha" />}>
      <Menu selectedId={sorter.sortBy}>
        {getMenuItem('created', 'Created on')}
        {getMenuItem('chosenInterval', 'Scheduled for')}
        {getMenuItem('subscriptions', 'Possible start')}
      </Menu>
    </Dropdown>
  );
};

export default SortByMenu;
