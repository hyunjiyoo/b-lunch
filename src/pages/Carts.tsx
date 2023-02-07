import { useEffect, useState } from 'react';
import { AiFillPlusSquare } from 'react-icons/ai';
import { FaEquals } from 'react-icons/fa';
import * as R from 'ramda';
import { useNavigate } from 'react-router-dom';
import { MESSAGE } from 'config/const';
import { getCartItems, getUserInfo } from 'util/\bcommon';

export default function Carts() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(() => getCartItems());

  useEffect(() => {
    if (R.isEmpty(getUserInfo().uid)) {
      alert(MESSAGE.LOGIN_INFO);
      navigate('/');
    }
  }, []);

  return (
    <div>
      <h1>내 장바구니</h1><hr />
      <ul>
      </ul>
      <div>
        <p>상품 총액</p>
        <p>₩200000</p>
        <AiFillPlusSquare />
        <p>배송비</p>
        <p>₩30000</p>
        <FaEquals />
        <p>총액</p>
        <p>₩203000</p>
      </div>
      <button type="button">주문하기</button>
    </div>
  );
}
