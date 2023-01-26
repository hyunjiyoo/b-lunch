import { database } from 'api/firebase';
import { ref, set, child, get } from 'firebase/database';
import { ProductType, UserType } from 'types';
import { User } from 'firebase/auth';
import { getUserFromLocalStorage } from 'util/getUserInfo';

const writeUserData = ({ uid, displayName, email, photoURL }: Partial<User>) => {
  const isAdmin = email === process.env.REACT_APP_ADMIN_USER;
  const data = { uid, displayName, email, photoURL, isAdmin } as UserType;

  set(ref(database, `users/${uid}`), data);
  localStorage.setItem('user', JSON.stringify(data));
};

const addProduct = (data: ProductType) => {
  set(ref(database, `products/${data.id}`), data);
};

const getAllProducts = (): Promise<ProductType[]> => 
  get(child(ref(database), `products/`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return Object.values(snapshot.val());
      } else {
        return [] as ProductType[];
      }
  });

const readUserData = (): Promise<UserType | string> =>
  get(child(ref(database), `users/${getUserFromLocalStorage().uid}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());

        return snapshot.val() as UserType;
      } else {
        console.log('No data available');
        return 'No data available';
      }
    })
    .catch((error) => {
      console.error(error);
      return 'error';
    });

const isAdminUser = () => {};

export { writeUserData, addProduct, getAllProducts, readUserData, isAdminUser };
