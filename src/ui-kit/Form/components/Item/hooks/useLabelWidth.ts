import { useLayoutEffect, useRef, useState } from 'react';

const useLabelWidth = () => {
  const ref = useRef<HTMLLabelElement>(null);

  const [width, setWidth] = useState<number | null>(null);

  useLayoutEffect(() => {
    const computedWidth = ref.current?.offsetWidth;

    computedWidth && setWidth(computedWidth);
  }, []);

  return { ref, width };
};

export default useLabelWidth;
