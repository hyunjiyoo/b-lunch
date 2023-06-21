import { ChangeEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MESSAGE } from 'config/const';
import { useCart } from 'context/CartContext';
import * as R from 'ramda';
import { CartType, ProductType } from 'types';
import { convertPriceFormat, getCartItems, getUserInfo } from '@/util/common';

interface UpdateCartItemsType {
  cartItems: CartType;
  selectedItem: ProductType;
  key: string;
}

export default function Detail() {
  const navigate = useNavigate();
  const {
    state: { product },
  } = useLocation();
  const [selectedOption, setSelectedOption] = useState<string>('');
  const { name, price, description, imageUrl, option, category } = product;
  const { updateCount } = useCart();

  const selectOption = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  const updateCartItems = ({ cartItems, selectedItem, key }: UpdateCartItemsType) => {
    if (R.isNil(cartItems[key])) {
      return { ...cartItems, [key]: selectedItem };
    }

    return { ...cartItems, [key]: { ...cartItems[key], count: cartItems[key].count + 1 } };
  };

  const putProductToCart = () => {
    const { uid } = getUserInfo();
    if (R.isEmpty(uid)) {
      alert(MESSAGE.LOGIN_INFO);
      return;
    }

    if (R.isEmpty(selectedOption)) {
      alert(MESSAGE.OPTION_INFO);
      return;
    }

    const cartItems = getCartItems();
    const selectedItem = { ...product, option: selectedOption, count: 1 };
    const key = `${product.id}_${selectedOption}`;

    if (R.isEmpty(cartItems)) {
      localStorage.setItem('cart', JSON.stringify({ [key]: selectedItem }));
    } else {
      const updated = updateCartItems({ cartItems, selectedItem, key });
      localStorage.setItem('cart', JSON.stringify(updated));
    }

    updateCount();
    window.confirm(MESSAGE.CART_INFO) && navigate('/carts');
  };

  return (
    <>
      <p>카테고리 🔸 {category}</p>
      <section className='grid lg:grid-cols-2 md:grid-cols-1 lg:gap-6'>
        <div className='w-full h-350px mt-4 bg-orange-50 py-2'>
          <img src={imageUrl} alt={`${name}_image`} className='h-full object-full m-auto rounded' />
        </div>
        <div className='mt-6'>
          <p className='text-xl my-4 font-semibold'>{name}</p>
          <p className='font-semibold'>{convertPriceFormat(price)}</p>
          <hr className='my-4' />
          <p className='text-sm text-zinc-500 h-100px'>{description}</p>
          <div className='flex items-center'>
            <label htmlFor='select' className='mr-2 text-sm text-white py-1 px-2 border border-orange-500 bg-orange-500 font-semibold'>
              옵션
            </label>
            <select
              id='select'
              value={selectedOption}
              className='my-4 border-2 border-orange-500 flex-1 p-1 text-slate-600 text-sm outline-none'
              onChange={selectOption}
            >
              <option value=''>옵션을 선택해주세요</option>
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
      </section>
    </>
  );
}
