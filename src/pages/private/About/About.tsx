import InfoTile from 'components/InfoTile';
import Text from 'components/Text';
import Page from 'ui-kit/Page';
import styles from './About.module.scss';

const About: React.VFC = () => (
  <Page title="About">
    <div className={styles['Root']}>
      <InfoTile heading="What’s this app?" icon="EventAvailable">
        <p className={styles['Paragraph']}>
          <Text font="primaryBold">Find the Time</Text>
          <Text>
            {' '}
            is a simple and straightforward app for scheduling events.
          </Text>
        </p>
      </InfoTile>
      <InfoTile heading="How does it work?" icon="Info">
        <ul className={styles['List']}>
          <li>
            <Text>
              Create an event by specifying its name, location, duration and
              optional description. Most importantly, set the time intervals in
              which your event can happen.
            </Text>
          </li>
          <li>
            <Text>Share it with others.</Text>
          </li>
          <li>
            <Text>
              The people you invited will narrow your intervals according to
              their availability.
            </Text>
          </li>
          <li>
            <Text>
              When everybody subscribed, you will be shown the time frames when
              everybody is available.
            </Text>
          </li>
          <li>
            <Text>
              Now all that’s left is for you to pick when your event will happen
              within these frames!
            </Text>
          </li>
        </ul>
      </InfoTile>
    </div>
  </Page>
);

export default About;
