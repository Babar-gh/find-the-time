import { useEffect, useRef } from 'react';

const useIntersection = <T extends HTMLElement>(onIntersection: () => void) => {
  const observer = useRef(
    new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        onIntersection();
      }
    })
  );

  const setSentinelRef = (sentinel: T | null) => {
    if (sentinel) {
      observer.current.observe(sentinel);
    }
  };

  useEffect(() => {
    const observerInstance = observer.current;

    return () => {
      observerInstance.disconnect();
    };
  }, []);

  return { setSentinelRef };
};

export default useIntersection;
