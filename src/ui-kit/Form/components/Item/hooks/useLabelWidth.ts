import { useLayoutEffect, useRef, useState } from 'react';

const useLabelWidth = (formLayout: 'vertical' | 'horizontal') => {
  const ref = useRef<HTMLLabelElement>(null);

  const [width, setWidth] = useState<number | null>(null);

  useLayoutEffect(() => {
    const computedWidth = ref.current?.offsetWidth;

    computedWidth && setWidth(computedWidth);
  }, [formLayout]);

  return { ref, width };
};

export default useLabelWidth;
