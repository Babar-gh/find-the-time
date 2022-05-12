import Subscriptions from 'components/Subscriptions';
import { Guid } from 'types/common';
import DummyContent from 'ui-kit/DummyContent';
import Page from 'ui-kit/Page';

const DummyPage: React.FC = () => (
  <Page title="I’m an Example Page">
    <Subscriptions
      subscriptions={[
        {
          user: {
            id: 'cafcb524-40be-4a8d-801a-1919ed6ce72d' as Guid,
            email: 'test@text.kz',
            name: '',
          },
          availability: [
            {
              start: '2021-12-23 01:00:00',
              end: '2021-12-24 23:00:00',
            },
            {
              start: '2021-12-22 14:00:00',
              end: '2021-12-22 23:00:00',
            },
          ],
        },
        {
          user: {
            id: 'cafcb524-40be-4a8d-801a-1919ed6ce123' as Guid,
            email: 'test2@text.kz',
            name: 'Lupa',
          },
          availability: [
            {
              start: '2021-12-23 05:00:00',
              end: '2021-12-24 04:00:00',
            },
            {
              start: '2021-12-24 12:00:00',
              end: '2021-12-24 20:00:00',
            },
          ],
        },
        {
          user: {
            id: 'cafcb524-40be-4a8d-801a-1919ed6ce234' as Guid,
            email: 'test3@text.kz',
            name: 'Pupa',
          },
          availability: [
            {
              start: '2021-12-23 10:00:00',
              end: '2021-12-23 18:00:00',
            },
            {
              start: '2021-12-24 01:00:00',
              end: '2021-12-24 15:00:00',
            },
            {
              start: '2021-12-22 18:00:00',
              end: '2021-12-22 23:00:00',
            },
          ],
        },
        {
          user: {
            id: 'cafcb524-40be-4a8d-801a-1919ed6ce345' as Guid,
            email: 'test4@text.kz',
            name: 'Senator Armstrong',
          },
          availability: [
            {
              start: '2021-12-23 01:00:00',
              end: '2021-12-23 15:00:00',
            },
            {
              start: '2021-12-23 22:00:00',
              end: '2021-12-24 03:00:00',
            },
            {
              start: '2021-12-24 10:00:00',
              end: '2021-12-24 23:00:00',
            },
            {
              start: '2021-12-22 15:00:00',
              end: '2021-12-22 19:00:00',
            },
            {
              start: '2021-12-22 20:00:00',
              end: '2021-12-22 22:00:00',
            },
          ],
        },
      ]}
    />
    <DummyContent />
  </Page>
);

export default DummyPage;
