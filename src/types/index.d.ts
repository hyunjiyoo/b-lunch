export interface UserType {
  uid: string;
  displayName: string;
  email: string;
  isAdmin: boolean;
  photoURL: string;
}

export interface ProductType {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  option: string;
  count?: number;
  file?: FileList;
  imageUrl?: string;
}

type UserCart = ProductType & {
  count: number,
};

export type CartType = Record<string, UserCart>;
