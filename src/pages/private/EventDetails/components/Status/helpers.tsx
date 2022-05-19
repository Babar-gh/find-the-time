import Text from 'components/Text';
import Separator from 'ui-kit/Separator';

export const getStatusInfo = (primary: string, secondary: string) => (
  <>
    <Text>{primary}</Text>
    <Separator />
    <Text font="primaryItalic" size="small">
      {secondary}
    </Text>
  </>
);
