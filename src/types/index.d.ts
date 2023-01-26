export interface UserType {
  uid: string;
  displayName: string;
  email: string;
  isAdmin: boolean;
  photoURL: string;
}

export interface ProductType {
  name: string;
  price: number;
  category: string;
  description: string;
  option: string;
  file: FileList;  
}
