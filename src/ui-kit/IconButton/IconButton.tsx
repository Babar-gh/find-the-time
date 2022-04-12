import { ComponentProps } from 'react';
import Button from 'ui-kit/Button';
import { ButtonElementSpecificProps } from 'ui-kit/Button/Button';

type Props = {
  icon: ComponentProps<typeof Button>['leftIcon'];
  isPressed?: ComponentProps<typeof Button>['isPressed'];
} & ButtonElementSpecificProps;

const IconButton: React.VFC<Props> = ({ icon, isPressed, ...rest }) => {
  return (
    <Button
      leftIcon={icon}
      isPressed={isPressed}
      width="square"
      theme="secondary"
      {...rest}
    />
  );
};

export default IconButton;
