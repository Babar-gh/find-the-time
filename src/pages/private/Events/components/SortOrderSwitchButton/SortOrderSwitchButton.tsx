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

  return (
    <IconButton
      icon={icon}
      onClick={() => {
        onSorterChange({
          direction:
            sorter.direction === 'descending' ? 'ascending' : 'descending',
        });
      }}
    />
  );
};

export default SortOrderSwitchButton;
