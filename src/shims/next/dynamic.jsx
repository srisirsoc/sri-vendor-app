import React from 'react';

export default function dynamic(loader) {
  const LazyComponent = React.lazy(loader);
  return (props) => (
    <React.Suspense fallback={null}>
      <LazyComponent {...props} />
    </React.Suspense>
  );
}
