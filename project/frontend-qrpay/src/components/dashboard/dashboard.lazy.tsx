import React, {JSX, lazy, Suspense} from 'react';

const Lazydashboard = lazy(() => import('./dashboard'));

const dashboard = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <Lazydashboard {...props} />
  </Suspense>
);

export default dashboard;
