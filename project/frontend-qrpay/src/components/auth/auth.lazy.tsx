import React, {JSX, lazy, Suspense} from 'react';

const Lazyauth = lazy(() => import('./auth'));

const auth = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <Lazyauth {...props} />
  </Suspense>
);

export default auth;
