import Layout from 'components/Layout';

interface IProps {
  onThemeSwitch: () => void;
}

const PrivateApp: React.VFC<IProps> = ({ onThemeSwitch }) => {
  return <Layout onThemeSwitch={onThemeSwitch} />;
};

export default PrivateApp;
