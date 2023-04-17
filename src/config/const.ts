import { UserType } from 'types';

const UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET as string;
const CLOUDINARY_CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_URL = `https://api.cloudinary.com/v2/${CLOUDINARY_CLOUD_NAME}/upload/q_50`;
const DEFAULT_IMAGE_URL = 'https://via.placeholder.com/400';

const initialUser: UserType = {
  uid: '',
  displayName: '',
  email: '',
  isAdmin: false,
  photoURL: '',
};

const MESSAGE = {
  LOGIN_INFO: '로그인을 먼저 해주세요.',
  ADMIN_INFO: '권한이 없습니다.',
  OPTION_INFO: '옵션을 먼저 선택해주세요.',
  CART_INFO: '장바구니에 상품이 추가되었습니다.\n장바구니로 이동하시겠습니까?',
};

const DELIVERY_COST = 3000;
const FREE_DELIVERTY_PRICE = 100000;
const LIMIT_PRODUCT_PRICE = 1000000;

export { UPLOAD_PRESET, CLOUDINARY_URL, DEFAULT_IMAGE_URL, initialUser, MESSAGE, DELIVERY_COST, FREE_DELIVERTY_PRICE, LIMIT_PRODUCT_PRICE };
