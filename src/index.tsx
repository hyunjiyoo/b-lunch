import React, { lazy } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import NotFound from 'pages/NotFound';

const Products = lazy(() => import('pages/Products'));
const Detail = lazy(() => import('pages/Detail'));
const Register = lazy(() => import('pages/Register'));
const Carts = lazy(() => import('pages/Carts'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Products /> },
      { path: '/products', element: <Products /> },
      { path: '/products/detail/:id', element: <Detail /> },
      { path: '/register', element: <Register /> },
      { path: '/carts', element: <Carts /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
