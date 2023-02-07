import { useEffect, useState } from 'react';
import { BsGiftFill, BsCart4 } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { logIn, logOut } from 'api/sign';
import { getCartProducts, writeCartData, writeUserData } from 'db/database';
import { getUserInfo } from 'util/\bcommon';
import { useCart } from 'context/CartContext';

export default function Header() {
  const navigate = useNavigate();
  const [uid, setUid] = useState<string>(() => getUserInfo().uid);
  const [admin, setAdmin] = useState<boolean>(() => getUserInfo().isAdmin);
  const { count, updateCount } = useCart();

  const onLogIn = async () => {
    const user = await logIn();
    const cart = await getCartProducts(user.uid);
        
    writeUserData(user);
    setUid(() => getUserInfo().uid);
    setAdmin(() => getUserInfo().isAdmin);
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  const onLogOut = async () => {
    await logOut();
    
    writeCartData(uid);
    setUid('');
    setAdmin(false);
    localStorage.clear();
    navigate('/', { replace: true });
    alert('정상적으로 로그아웃되었습니다.');
  };

  const handleLoginButton = () => {
    uid ? onLogOut() : onLogIn();
  };
  
  useEffect(() => {
    updateCount();
  }, [uid, count, updateCount]);

  return (
    <header className='flex items-center justify-between mb-4'>
      <Link to='/' className='flex items-center text-orange-600 cursor-pointer'>
        <BsGiftFill className='text-xl' />
        <h1 className='text-2xl ml-2 w-max'>B-Lunch</h1>
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
        <Link to='carts' className='relative'>
          <BsCart4 className='cursor-pointer text-2xl mr-5'/>
          <span className='absolute bg-orange-500 text-white rounded-full text-sm px-1.5 right-2 bottom-2'>
            {count || ''}
          </span>
        </Link>
        <button className='bg-orange-600 px-3 py-1 rounded text-white' onClick={handleLoginButton}>
          {uid ? 'Logout' : 'Login'}
        </button>
      </div>
    </header>
  );
}
