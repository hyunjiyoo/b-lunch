import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cart from 'components/Cart/Cart';
import { DELIVERY_COST, FREE_DELIVERTY_PRICE, MESSAGE } from 'config/const';
import { useCart } from 'context/CartContext';
import * as R from 'ramda';
import { AiFillPlusSquare } from 'react-icons/ai';
import { FaEquals } from 'react-icons/fa';
import { ProductType } from 'types';
import { convertPriceFormat, getCartItems, getUserInfo } from '@/util/common';

export default function Carts() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<ProductType[]>([]);
  const [productPrice, setProductPrice] = useState<number>(0);
  const [deliveryPrice, setDeliveryPrice] = useState<number>(DELIVERY_COST);
  const { updateCount } = useCart();

  const handleDecrease = (key: string) => {
    const cartItems = getCartItems();
    const item = { ...cartItems[key], count: cartItems[key].count && cartItems[key].count - 1 };
    const updatedItems = { ...cartItems, [key]: item };

    localStorage.setItem('cart', JSON.stringify(updatedItems));
    setCartItems(updatedItems);
  };

  const handleIncrease = (key: string) => {
    const cartItems = getCartItems();
    const item = { ...cartItems[key], count: cartItems[key].count + 1 };
    const updatedItems = { ...cartItems, [key]: item };

    localStorage.setItem('cart', JSON.stringify(updatedItems));
    setCartItems(updatedItems);
  };

  const handleDelete = (key: string) => {
    const cart = getCartItems();
    delete cart[key];
    localStorage.setItem('cart', JSON.stringify(cart));

    setCartItems(cart);
    updateCount();
  };

  const handleOrder = () => {
    if (productPrice === 0) {
      alert('1가지 이상의 제품을 담아주세요🧡');
      return;
    }

    const totalPrice = convertPriceFormat(productPrice + deliveryPrice, '원', '');
    window.confirm(`총 주문금액은 ${totalPrice}입니다.\n주문을 진행하시겠습니까?`) && alert('🧡 주문완료 🧡');
  };

  useEffect(() => {
    const totPrice = Object.values(cartItems).reduce((acc, { price, count }) => acc + price * count!, 0);
    setProductPrice(totPrice);

    const freeDeliveryPriceCondition = productPrice >= FREE_DELIVERTY_PRICE || productPrice === 0;
    freeDeliveryPriceCondition ? setDeliveryPrice(0) : setDeliveryPrice(DELIVERY_COST);
  }, [cartItems, productPrice]);

  useEffect(() => {
    if (R.isEmpty(getUserInfo().uid)) {
      alert(MESSAGE.LOGIN_INFO);
      navigate('/');
    }

    setCartItems(getCartItems());
  }, [navigate]);

  return (
    <>
      <h1 className='text-xl font-bold text-center my-4'>내 장바구니 🛒</h1>
      <hr />
      <ul className='py-3 px-4'>
        {Object.values(cartItems).map((item: ProductType) => (
          <Cart key={`${item.id}_${item.option}`} item={item} handleDecrease={handleDecrease} handleIncrease={handleIncrease} handleDelete={handleDelete} />
        ))}
      </ul>
      <hr />
      <div className='flex items-center justify-evenly my-6'>
        <div className='text-center'>
          <p>상품 총액</p>
          <p className='text-orange-500 font-bold mt-1'>{convertPriceFormat(productPrice)}</p>
        </div>
        <AiFillPlusSquare />
        <div className='text-center'>
          <p>배송비</p>
          <p className='text-orange-500 font-bold mt-1'>{convertPriceFormat(deliveryPrice)}</p>
        </div>
        <FaEquals />
        <div className='text-center'>
          <p>총액</p>
          <p className='text-orange-500 font-bold mt-1'>{convertPriceFormat(productPrice + deliveryPrice)}</p>
        </div>
      </div>
      <button type='button' className='bg-orange-500 text-white font-semibold p-2 w-full rounded' onClick={handleOrder}>
        주문하기
      </button>
      <p className='text-gray-500 text-right mt-2 text-sm'>* 상품 금액 ₩100,000원 이상일 경우 무료배송</p>
    </>
  );
}
