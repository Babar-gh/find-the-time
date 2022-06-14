import IconButton from 'ui-kit/IconButton';
import useEventList from '../../hooks/useEventList';

interface IProps extends Pick<ReturnType<typeof useEventList>, 'sorter'> {
  onSorterChange: ReturnType<typeof useEventList>['applySorter'];
}

const SortOrderSwitchButton: React.VFC<IProps> = ({
  sorter,
  onSorterChange,
}) => {
  const icon =
    sorter.direction === 'descending' ? 'ArrowDownward' : 'ArrowUpward';
  const direction =
    sorter.direction === 'descending' ? 'ascending' : 'descending';

  const handleClick = () => onSorterChange({ direction });

  return (
    <IconButton
      icon={icon}
      elementProps={{ onClick: handleClick, title: 'Sort direction' }}
    />
  );
};

export default SortOrderSwitchButton;
