import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // rolar com animação suave
  }, [pathname]);

  return null; // não renderiza nada visualmente
};

export default ScrollToTop;
