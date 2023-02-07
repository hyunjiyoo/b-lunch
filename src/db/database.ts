import { database } from 'api/firebase';
import { ref, set, child, get } from 'firebase/database';
import { ProductType, UserType, CartType } from 'types';
import { User } from 'firebase/auth';
import { getCartItems, getUserInfo } from 'util/\bcommon';

const writeUserData = ({ uid, displayName, email, photoURL }: Partial<User>) => {
  const isAdmin = !!(process.env.REACT_APP_ADMIN_USER?.includes(email as string));
  const data = { uid, displayName, email, photoURL, isAdmin } as UserType;

  set(ref(database, `users/${uid}`), data);
  localStorage.setItem('user', JSON.stringify(data));
};

const writeCartData = (uid: string) => {
  const userCart = getCartItems();    
  set(ref(database, `carts/${uid}`), userCart);
};

const addProduct = (data: ProductType) => {
  set(ref(database, `products/${data.id}`), data);
};

const getCartProducts = (uid: string): Promise<CartType> =>
  get(child(ref(database), `carts/${uid}`)).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return {} as CartType;
    }
  });

const getAllProducts = (): Promise<ProductType[]> =>
  get(child(ref(database), `products/`)).then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    } else {
      return [] as ProductType[];
    }
  });

const getProductById = (id: string): Promise<ProductType[]> =>
  get(child(ref(database), `products/${id}`)).then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    } else {
      return [] as ProductType[];
    }
  });

const readUserData = (): Promise<UserType | string> =>
  get(child(ref(database), `users/${getUserInfo().uid}`))
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

export { writeUserData, writeCartData, getCartProducts, addProduct, getAllProducts, getProductById, readUserData, isAdminUser };
