import { UserType } from 'types';

const initialUser: UserType = {
  uid: '',
  displayName: '',
  email: '',
  isAdmin: false,
  photoURL: '',
};

export const getUserFromLocalStorage = (): UserType => {
  const localStorageUser = localStorage.getItem('user');
  const user = localStorageUser ? JSON.parse(localStorageUser) : initialUser;
  return user;
};
