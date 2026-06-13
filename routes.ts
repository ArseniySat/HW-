// src/routes.ts
import { createBrowserRouter } from 'react-router';
import Layout from './components/Layout';
import PromoPage from './components/PromoPage';
import ActivatedPage from './components/ActivatedPage';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        Component: PromoPage,
      },
      {
        path: 'promo',
        Component: PromoPage,
      },
      {
        path: 'activated',
        Component: ActivatedPage,
      },
    ],
  },
]);

export default router;
