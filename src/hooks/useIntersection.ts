import { useEffect, useRef } from 'react';

const useIntersection = (onIntersection: () => void) => {
  const sentinel = useRef<HTMLDivElement>(null);

  const observer = useRef(
    new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        onIntersection();
      }
    })
  );

  useEffect(() => {
    const currentElement = sentinel.current;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(sentinel.current);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [sentinel]);

  return { sentinel };
};

export default useIntersection;
