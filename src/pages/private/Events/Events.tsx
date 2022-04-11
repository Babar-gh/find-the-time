import classNames from 'classnames/bind';
import LinkWrapper from 'components/LinkWrapper';
import Loader from 'ui-kit/Loader';
import Page from 'ui-kit/Page';
import useIntersection from 'hooks/useIntersection';
import { PRIVATE } from 'constants/routes';
import Button from 'ui-kit/Button';
import styles from './Events.module.scss';
import useEventList from './hooks/useEventList';
import EventTile from './components/EventTile';
import SearchInput from './components/SearchInput';
import SortOrderSwitchButton from './components/SortOrderSwitchButton';
import SortByMenu from './components/SortByMenu';

const cn = classNames.bind(styles);

const PAGE_SIZE = 10;

const Events: React.VFC = () => {
  const list = useEventList(PAGE_SIZE);

  const filterProps = { filter: list.filter, onFilterChange: list.applyFilter };
  const sorterProps = { sorter: list.sorter, onSorterChange: list.applySorter };

  const { setSentinelRef } = useIntersection<HTMLElement>(list.getNextPage);

  return (
    <Page
      title="Events"
      headerAddon={
        <Button
          element="LinkWrapper"
          elementProps={{ type: 'RouterLink', to: PRIVATE.CreateEvent }}
        >
          Create new event
        </Button>
      }
    >
      <div className={styles['Controls']}>
        <SearchInput {...filterProps} />
        <SortOrderSwitchButton {...sorterProps} />
        <SortByMenu {...sorterProps} />
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
              <LinkWrapper
                type="RouterLink"
                to={`${PRIVATE.Events}/${id}`}
                className={styles['ListItemLink']}
              >
                <EventTile id={id} {...rest} />
              </LinkWrapper>
            </li>
          );
        })}
        {list.isLoading && (
          <Loader isShown={true}>
            <li className={cn('ListItem', 'ListItem_loader')} />
          </Loader>
        )}
      </ul>
    </Page>
  );
};

export default Events;
