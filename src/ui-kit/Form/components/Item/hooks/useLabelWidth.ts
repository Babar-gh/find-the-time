import { useLayoutEffect, useRef, useState } from 'react';

const useLabelWidth = (_formLayout: 'vertical' | 'horizontal') => {
  const ref = useRef<HTMLLabelElement>(null);

  const [width, setWidth] = useState<number | null>(null);

  useLayoutEffect(() => {
    const computedWidth = ref.current?.offsetWidth;

    computedWidth && setWidth(computedWidth);
  }, [_formLayout]);

  return { ref, width };
};

export default useLabelWidth;
