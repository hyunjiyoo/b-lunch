import { initialUser } from "config/const";

const convertPriceFormat = (price: number) => {
  return '₩' + (+price).toLocaleString('en');
}

const getUserInfo = () => {
  const localStorageUser = localStorage.getItem('user');
  const user = localStorageUser ? JSON.parse(localStorageUser) : initialUser;

  return user || initialUser;
}

const getCartItems = () => {
  return JSON.parse(localStorage.cart ?? JSON.stringify({}));
}

export { convertPriceFormat, getUserInfo, getCartItems };
