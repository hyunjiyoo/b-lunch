import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import NotFound from 'pages/NotFound';
import Products from 'pages/Products';
import Register from 'pages/Register';
import Detail from 'components/Product/Detail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Products /> },
      { path: 'products', element: <Products /> },
      { path: 'products/detail/:id', element: <Detail /> },
      { path: 'register', element: <Register /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
