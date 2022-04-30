import classNames from 'classnames/bind';
import { ComponentProps } from 'react';
import Text from 'components/Text';
import styles from './InfoDisplay.module.scss';

interface IProps extends Pick<ComponentProps<typeof Text>, 'clamp'> {
  theme?: 'neutral' | 'danger';
  height?: 'auto' | 'fill';
  children: string | string[];
}

const cn = classNames.bind(styles);

const InfoDisplay: React.FC<IProps> = ({
  theme = 'neutral',
  height = 'auto',
  clamp,
  children,
}) => {
  const paragraphs = Array.isArray(children) ? children : [children];

  return (
    <div className={cn('Root', `Root_theme_${theme}`, `Root_height_${height}`)}>
      {paragraphs.map((paragraph, index) => (
        <p className={styles['Paragraph']} key={index}>
          <Text clamp={clamp}>{paragraph}</Text>
        </p>
      ))}
    </div>
  );
};

export default InfoDisplay;
