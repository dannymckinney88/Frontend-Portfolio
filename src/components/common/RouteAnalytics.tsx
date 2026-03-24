import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GA_MEASUREMENT_ID = 'G-JN9W727DL5';

export const RouteAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined' || !window.gtag) return;

    const pagePath = `${location.pathname}${location.search}${location.hash}`;

    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: pagePath,
    });
  }, [location]);

  return null;
};
