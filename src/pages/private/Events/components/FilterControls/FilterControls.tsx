import { useEffect, useState } from 'react';
import Dropdown from 'ui-kit/Dropdown';
import IconButton from 'ui-kit/IconButton';
import Text from 'components/Text';
import useBreakpointCheck from 'hooks/useBreakpointCheck';
import useEventList from '../../hooks/useEventList';

interface IProps extends Pick<ReturnType<typeof useEventList>, 'filter'> {
  onFilterChange: ReturnType<typeof useEventList>['applyFilter'];
}

const FilterControls: React.VFC<IProps> = ({ filter, onFilterChange }) => {
  const bp = useBreakpointCheck();
  const align = bp('Mobile') ? 'right' : 'center';

  const [pendingAreShown, setPendingAreShown] = useState(true);
  const [pastAreShown, setPastAreShown] = useState(true);

  useEffect(() => {
    const status =
      pendingAreShown && pastAreShown
        ? null
        : pendingAreShown
          ? 'pending'
          : 'past';

    if (filter.status !== status) {
      onFilterChange({ status });
    }
  }, [pendingAreShown, pastAreShown, filter.status, onFilterChange]);

  return (
    <Dropdown
      align={align}
      width="wide"
      closeOnClick={false}
      trigger={<IconButton icon="FilterList" />}
    >
      <ul style={{ listStyle: 'none' }}>
        <li>
          <input
            type="checkbox"
            checked={filter.isOrganizer === null}
            onChange={(e) =>
              onFilterChange({ isOrganizer: e.target.checked ? null : true })
            }
            id="1"
          />
          <label htmlFor="1">
            <Text>Organized by others</Text>
          </label>
        </li>
        <li>
          <input
            type="checkbox"
            checked={pendingAreShown}
            onChange={(e) => setPendingAreShown(e.target.checked)}
            id="2"
          />
          <label htmlFor="2">
            <Text>Pending</Text>
          </label>
        </li>
        <li>
          <input
            type="checkbox"
            checked={pastAreShown}
            onChange={(e) => setPastAreShown(e.target.checked)}
            id="3"
          />
          <label htmlFor="3">
            <Text>Past</Text>
          </label>
        </li>
      </ul>
    </Dropdown>
  );
};

export default FilterControls;
