import { User } from "types";

const initialUser: User = {
  uid: '',
  displayName: '',
  email: '',
  isAdmin: false,
  photoURL: '',
};

export const getUserFromLocalStorage = (): User => {
  const localStorageUser = localStorage.getItem('user');
  const user = localStorageUser ? JSON.parse(localStorageUser) : initialUser;
  return user;
}
