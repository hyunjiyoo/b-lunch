import { initialUser } from 'config/const';

const convertPriceFormat = (price: number, won = '', unit = '₩') => {
  return unit + (+price).toLocaleString('en') + won;
};

const getUserInfo = () => {
  const localStorageUser = localStorage.getItem('user');
  const user = localStorageUser ? JSON.parse(localStorageUser) : initialUser;

  return user || initialUser;
};

const getCartItems = () => {
  return JSON.parse(localStorage.cart ?? JSON.stringify({}));
};

export { convertPriceFormat, getUserInfo, getCartItems };
