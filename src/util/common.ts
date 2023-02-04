import { getUserFromLocalStorage } from 'util/getUserInfo';

const convertPriceFormat = (price: number) => {
  return '₩' + (+price).toLocaleString('en');
}

const isLogin = () => {
  const user = getUserFromLocalStorage();
  if (!user.uid) {
    alert('로그인을 먼저 해주세요.');
    return false;
  }
  return true;
}

export { convertPriceFormat, isLogin };
