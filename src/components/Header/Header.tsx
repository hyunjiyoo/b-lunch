import { BsGiftFill, BsCart4 } from 'react-icons/bs';
import { Link } from 'react-router-dom';

export default function Header() {

  return (
    <header className='flex items-center justify-between'>
      <Link to="/" className='flex items-center text-orange-600 cursor-pointer'>
        <BsGiftFill className='text-xl'/>
        <h1 className='text-2xl ml-2'>B-Lunch</h1>
      </Link>
      <div className='flex items-center'>
        <nav>
          <ul className='flex gap-2'>
            <li className='cursor-pointer hover:opacity-70'>Products</li>
          </ul>
        </nav>
        <BsCart4 className='text-2xl mx-5' />
        <button className='bg-orange-600 px-3 py-1 rounded text-white'>Login</button>
      </div>
    </header>
  );
}
