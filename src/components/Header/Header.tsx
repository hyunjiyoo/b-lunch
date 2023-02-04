import { useState } from 'react';
import { BsGiftFill, BsCart4 } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { logIn, logOut } from 'api/sign';
import { writeUserData } from 'db/database';
import { getUserFromLocalStorage } from 'util/getUserInfo';
import { updateCount, useCartCount } from 'context/CartContext';

export default function Header() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState<boolean>(() => !!(getUserFromLocalStorage().uid));
  const [admin, setAdmin] = useState<boolean>(() => getUserFromLocalStorage().isAdmin);
  const { count, setCount } = useCartCount();

  const onLogIn = async () => {
    const user = await logIn();
    writeUserData(user);
    setAdmin(() => getUserFromLocalStorage().isAdmin);
    setCount(updateCount);
    setIsLogin(true);
  };

  const onLogOut = async () => {
    if (!window.confirm('로그아웃하시면 장바구니에 있는 상품이 모두 초기화됩니다.\n정말로 로그아웃하시겠습니까?')) {
      return;
    }

    await logOut();
    localStorage.clear();
    setIsLogin(false);
    setAdmin(false);
    setCount(0);
    navigate('/', { replace: true });
  };

  const handleLoginButton = () => {
    isLogin ? onLogOut() : onLogIn();
  };

  return (
    <header className='flex items-center justify-between mb-4'>
      <Link to='/' className='flex items-center text-orange-600 cursor-pointer'>
        <BsGiftFill className='text-xl' />
        <h1 className='text-2xl ml-2'>B-Lunch</h1>
      </Link>
      <div className='flex items-center'>
        <nav>
          <ul className='flex gap-2'>
            <Link to='/products' className='cursor-pointer hover:opacity-70 mr-5'>
              Products
            </Link>
          </ul>
        </nav>
        {admin && (
          <Link to='register'>
            <FiEdit className='cursor-pointer text-2xl mr-5' />
          </Link>
        )}
        <Link to='cart' className='relative'>
          <BsCart4 className='cursor-pointer text-2xl mr-5'/>
          <span className='absolute bg-orange-500 text-white rounded-full text-sm px-1.5 right-2 bottom-2'>{count > 0 && count}</span>
        </Link>
        <button className='bg-orange-600 px-3 py-1 rounded text-white' onClick={handleLoginButton}>
          {isLogin ? 'Logout' : 'Login'}
        </button>
      </div>
    </header>
  );
}
