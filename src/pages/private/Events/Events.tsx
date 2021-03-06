import classNames from 'classnames/bind';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import Backdrop from 'ui-kit/Backdrop';
import Button from 'ui-kit/Button';
import Link from 'ui-kit/Link';
import Loader from 'ui-kit/Loader';
import Page from 'ui-kit/Page';
import useIntersection from 'hooks/useIntersection';
import { PRIVATE } from 'constants/routes';
import EventTile from './components/EventTile';
import FilterControls from './components/FilterControls';
import SearchInput from './components/SearchInput';
import SortByMenu from './components/SortByMenu';
import SortOrderSwitchButton from './components/SortOrderSwitchButton';
import styles from './Events.module.scss';
import useEventList from './hooks/useEventList';

const cn = classNames.bind(styles);

const PAGE_SIZE = 10;

const Events: React.VFC = () => {
  const list = useEventList(PAGE_SIZE);

  const filterProps = { filter: list.filter, onFilterChange: list.applyFilter };
  const sorterProps = { sorter: list.sorter, onSorterChange: list.applySorter };

  const { setSentinelRef } = useIntersection<HTMLElement>(list.getNextPage);

  const pageIsLoading = list.isLoading && list.pagination.pageNumber === 0;
  const tileIsLoading = list.isLoading && list.pagination.pageNumber > 0;

  return (
    <>
      <Suspense fallback={<Backdrop isOpen />}>
        <Outlet />
      </Suspense>
      <Page
        title="Events"
        headerAddon={
          <Button
            element="Link"
            elementProps={{ type: 'RouterLink', to: PRIVATE.CreateEvent }}
          >
            Create new event
          </Button>
        }
        isLoading={pageIsLoading}
      >
        <div className={styles['Controls']}>
          <SearchInput {...filterProps} />
          <SortOrderSwitchButton {...sorterProps} />
          <SortByMenu {...sorterProps} />
          <FilterControls {...filterProps} />
        </div>
        <ul className={styles['List']}>
          {list.items.map(({ id, ...rest }, index) => {
            const isLast = list.items.length - 1 === index;

            return (
              <li
                className={styles['ListItem']}
                key={id}
                ref={isLast ? setSentinelRef : undefined}
              >
                <Link
                  type="RouterLink"
                  to={`${PRIVATE.Events}/${id}`}
                  isWrapper
                >
                  <EventTile id={id} {...rest} />
                </Link>
              </li>
            );
          })}
          {tileIsLoading && (
            <Loader isShown={true}>
              <li className={cn('ListItem', 'ListItem_loader')} />
            </Loader>
          )}
        </ul>
      </Page>
    </>
  );
};

export default Events;
