import { useEffect, useRef, useState } from 'react';

const useIntersection = <S extends HTMLElement>(
  onIntersection?: () => void,
  onNoIntersection?: () => void
) => {
  const observer = useRef(
    new IntersectionObserver(([entry]) => {
      entry.isIntersecting
        ? onIntersection && onIntersection()
        : onNoIntersection && onNoIntersection();
    })
  );

  const [sentinelRef, setSentinelRef] = useState<S | null>(null);

  useEffect(() => {
    const observerInstance = observer.current;

    if (sentinelRef) {
      observerInstance.observe(sentinelRef);
    }

    return () => {
      observerInstance.disconnect();
    };
  }, [sentinelRef]);

  return { setSentinelRef };
};

export default useIntersection;
