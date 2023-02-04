import { updateCount, useCartCount } from 'context/CartContext';
import { ChangeEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { convertPriceFormat, isLogin } from 'util/\bcommon';

export default function Detail() {
  const navigate = useNavigate();
  const { state: { product } } = useLocation();
  const [selectedOption, setSelectedOption] = useState<string>('');
  const { setCount } = useCartCount();
  const { id, name, price, description, imageUrl, option, category } = product;

  const selectOption = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  }

  const putProductToCart = () => {
    if (!isLogin()) {
      return;
    }

    if (selectedOption === 'none') {
      alert('옵션을 먼저 선택해주세요.');
      return;
    }

    const cartItemsFromLocalStorage = localStorage.cart ?? JSON.stringify({});
    const cartItems = JSON.parse(cartItemsFromLocalStorage);
    const key = `${id}_${selectedOption}`;

    cartItems[key] = (cartItems[key] ?? 0) + 1;
    localStorage.setItem('cart', JSON.stringify(cartItems));
    setCount(updateCount);

    if (window.confirm('장바구니에 상품이 추가되었습니다.\n장바구니로 이동하시겠습니까?')) {
      navigate('/cart', { state: { cartItems }});
    }
  };

  return (
    <div>
      <p>카테고리 🔸 {category}</p>
      <div className='grid lg:grid-cols-2 md:grid-cols-1 lg:gap-6'>
        <div className='w-full h-350px mt-4 bg-orange-50 py-2'>
          <img src={imageUrl} alt={`${name}_image`} className='h-full object-full m-auto rounded' />
        </div>
        <div className='mt-6'>
          <p className='text-xl my-4 font-semibold'>{name}</p>
          <p className='font-semibold'>{convertPriceFormat(price)}</p>
          <hr className='my-4' />
          <p className='text-sm text-zinc-500 h-100px'>{description}</p>
          <div className='flex items-center'>
            <p className='mr-2 text-sm text-white py-1 px-2 border border-orange-500 bg-orange-500 font-semibold'>옵션</p>
            <select value={selectedOption} className='my-4 border-2 border-orange-500 flex-1 p-1 text-slate-600 text-sm' onChange={selectOption}>
              <option value='none'>옵션을 선택해주세요</option>
              {option.split(',').map((opt: string, idx: number) => (
                <option key={`${opt}_${idx}`} value={opt.trim()}>
                  {opt.trim()}
                </option>
              ))}
            </select>
          </div>
          <button type='button' className='mt-8 w-full bg-orange-500 text-white py-1 rounded' onClick={putProductToCart}>
            장바구니에 담기
          </button>
        </div>
      </div>
    </div>
  );
}
