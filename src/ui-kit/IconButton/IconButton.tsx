import { ComponentProps } from 'react';
import Button from 'ui-kit/Button';
import { ButtonElementSpecificProps } from 'ui-kit/Button/Button';

type Props = {
  icon: ComponentProps<typeof Button>['leftIcon'];
  isPressed?: ComponentProps<typeof Button>['isPressed'];
  isHighlighted?: boolean;
} & ButtonElementSpecificProps;

const IconButton: React.VFC<Props> = ({
  icon,
  isPressed,
  isHighlighted,
  ...rest
}) => {
  return (
    <Button
      leftIcon={icon}
      isPressed={isPressed}
      width="square"
      theme={isHighlighted ? 'secondaryInverted' : 'secondary'}
      {...rest}
    />
  );
};

export default IconButton;
