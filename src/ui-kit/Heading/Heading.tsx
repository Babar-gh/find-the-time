import Text from 'components/Text';
import styles from './Heading.module.scss';

interface IProps {
  children: string;
}

const Heading: React.FC<IProps> = ({ children }) => {
  return (
    <h2 className={styles['Root']}>
      <Text font="brand" size="big">
        {children}
      </Text>
    </h2>
  );
};

export default Heading;
