import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls to a hash element after route navigation completes.
 * Only runs when a hash is present in the URL.
 */
const ScrollToHash = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) return;

    const id = hash.slice(1);

    // Wait for the new route's DOM to render before scrolling
    const timer = setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname, hash]);

  return null;
};

export default ScrollToHash;
