import { debounce } from 'lodash';
import { useMemo } from 'react';
import Input from 'ui-kit/Input';
import useEventList from '../../hooks/useEventList';
import styles from './SearchInput.module.scss';

interface IProps extends Pick<ReturnType<typeof useEventList>, 'filter'> {
  onFilterChange: ReturnType<typeof useEventList>['applyFilter'];
}

const SearchInput: React.VFC<IProps> = ({ filter, onFilterChange }) => {
  const handleSearchChange = useMemo(
    () =>
      debounce((e: React.ChangeEvent<HTMLInputElement>): void => {
        if (e.target.value !== filter.title) {
          onFilterChange({ title: e.target.value });
        }
      }, 600),
    [filter.title, onFilterChange]
  );

  return (
    <div className={styles['Root']}>
      <Input
        theme="alternative"
        icon="Search"
        placeholder="Enter event name"
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default SearchInput;
