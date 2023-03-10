import Header from 'components/Header/Header';
import { CartProvider } from 'context/CartContext';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <CartProvider>
      <div className='m-auto max-w-450px w-full px-5 md:w-3/5 '>
        <Header />
        <Outlet />
      </div>
    </CartProvider>
  );
};

export default App;
