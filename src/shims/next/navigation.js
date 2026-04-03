import { useNavigate, useLocation } from 'react-router-dom';
import React from 'react';

export function useRouter() {
  const navigate = useNavigate();
  const location = useLocation();

  return {
    push: (to) => navigate(to),
    replace: (to) => navigate(to, { replace: true }),
    refresh: () => window.location.reload(),
    back: () => window.history.back(),
    prefetch: () => Promise.resolve(),
    pathname: location.pathname,
  };
}

export function usePathname() {
  return useLocation().pathname;
}

export function useSearchParams() {
  return new URLSearchParams(useLocation().search);
}

export function redirect(to) {
  if (typeof window !== 'undefined') {
    window.location.href = to;
  }
  return null;
}

export function notFound() {
  return React.createElement('div', null, 'Page not found');
}
