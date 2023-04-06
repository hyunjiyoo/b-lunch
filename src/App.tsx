import { CartProvider } from 'context/CartContext';
import { UserAuthProvider } from 'context/UserAuthContext';
import Loading from 'pages/Loading';
import { Suspense, lazy } from 'react';
import { Outlet } from 'react-router-dom';

const Header = lazy(() => import('components/Header/Header'));

const App = (): JSX.Element => {
  return (
    <UserAuthProvider>
      <CartProvider>
        <div className='m-auto max-w-450px w-full px-5 md:w-3/5 '>
          <Suspense fallback={<Loading />}>
            <Header />
            <Outlet />
          </Suspense>
        </div>
      </CartProvider>
    </UserAuthProvider>
  );
};

export default App;
