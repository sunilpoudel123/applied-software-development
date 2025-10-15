/* eslint-disable */
import auth from './auth';
import { lazy } from 'react';

export default {
  title: "auth",
};
const LazyAuth = lazy(() => import('./auth'));

export const Default = () => <LazyAuth />;