import { useEffect } from 'react';
import NProgress from 'nprogress';
import './nprogress.scss';

export const useProgressBar = (isLoading:boolean) => {
  NProgress.configure({
    showSpinner: true, // Disable spinner if not needed
    trickleSpeed: 200, // Adjust speed
    minimum: 0.3 // Start earlier
  });

  useEffect(() => {
    if (isLoading) {
      NProgress.start();
    } else {
      NProgress.done();
    }
    
    return () => {
      NProgress.done();
    };
  }, [isLoading]);
};
