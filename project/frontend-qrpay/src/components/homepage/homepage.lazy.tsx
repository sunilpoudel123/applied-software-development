import React, {JSX, lazy, Suspense} from 'react';

const Lazyhomepage = lazy(() => import('./homepage'));

const homepage = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <Lazyhomepage {...props} />
  </Suspense>
);

export default homepage;
