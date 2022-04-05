import { useEffect, useRef, useState } from 'react';

const useIntersection = <T extends HTMLElement>(onIntersection: () => void) => {
  const observer = useRef(
    new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        onIntersection();
      }
    })
  );

  const [sentinelRef, setSentinelRef] = useState<T | null>(null);

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
