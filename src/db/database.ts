import { database } from "api/firebase";
import { ref, set, child, get } from "firebase/database";
import { User } from "types";
import { User as UserFromFirebase } from "firebase/auth";
import { getUserFromLocalStorage } from "util/getUserInfo";

const writeUserData = ({
  uid,
  displayName,
  email,
  photoURL,
}: Partial<UserFromFirebase>) => {
  const data = {
    uid,
    displayName,
    email,
    photoURL,
    isAdmin: email === process.env.REACT_APP_ADMIN_USER,
  } as User;

  set(ref(database, "users/" + uid), data);
  localStorage.setItem("user", JSON.stringify(data));
};

const readUserData = (): Promise<User | string> =>
  get(child(ref(database), `users/${getUserFromLocalStorage().uid}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());

        return snapshot.val() as User;
      } else {
        console.log("No data available");
        return "No data available";
      }
    })
    .catch((error) => {
      console.error(error);
      return 'error';
    });

const isAdminUser = () => {};

export { writeUserData, readUserData, isAdminUser };
