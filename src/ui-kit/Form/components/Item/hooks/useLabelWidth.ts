import { useLayoutEffect, useRef, useState } from 'react';

const useLabelWidth = () => {
  const ref = useRef<HTMLLabelElement>(null);

  const [width, setWidth] = useState<number | null>(null);

  useLayoutEffect(() => {
    const computedWidth = ref.current?.offsetWidth;

    if (computedWidth) {
      setWidth((known) => (known === null ? computedWidth : known));
    }
  }, []);

  return { ref, width };
};

export default useLabelWidth;
