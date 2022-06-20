import InfoTile from 'components/InfoTile';
import Text from 'components/Text';
import Link from 'ui-kit/Link';
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
            is a simple and straightforward app for event scheduling. With it
            you can choose the time that works best for everyone you’ve invited
            based on when they are available.
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
      <InfoTile heading="Links" icon="Description">
        <p className={styles['Paragraph']}>
          <Text>Developed by</Text>
          <br />
          <Link
            type="HTMLAnchor"
            href={'https://github.com/Babar-gh'}
            target="_blank"
          >
            github.com/Babar-gh
          </Link>
        </p>
        <p className={styles['Paragraph']}>
          <Text>Repository</Text>
          <br />
          <Link
            type="HTMLAnchor"
            href={'https://github.com/Babar-gh/find-the-time'}
            target="_blank"
          >
            github.com/Babar-gh/find-the-time
          </Link>
        </p>
      </InfoTile>
    </div>
  </Page>
);

export default About;
