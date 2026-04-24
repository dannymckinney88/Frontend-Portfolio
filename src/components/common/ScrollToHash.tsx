import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls smoothly to a hash element after cross-route navigation completes.
 * Same-page hash changes are handled by the Navbar's useEffect instead.
 */
const ScrollToHash = () => {
  const { pathname, hash } = useLocation();
  const prevPathnameRef = useRef(pathname);

  useEffect(() => {
    const prevPathname = prevPathnameRef.current;
    prevPathnameRef.current = pathname;

    if (!hash) return;
    if (prevPathname === pathname) return; // same-page: Navbar handles it

    const id = hash.slice(1);

    const timer = setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname, hash]);

  return null;
};

export default ScrollToHash;
