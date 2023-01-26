import { database } from "api/firebase";
import { ref, set, child, get } from "firebase/database";
import { UserType } from "types";
import { User } from "firebase/auth";
import { getUserFromLocalStorage } from "util/getUserInfo";

const writeUserData = ({
  uid,
  displayName,
  email,
  photoURL,
}: Partial<User>) => {
  const data = {
    uid,
    displayName,
    email,
    photoURL,
    isAdmin: email === process.env.REACT_APP_ADMIN_USER,
  } as UserType;

  set(ref(database, "users/" + uid), data);
  localStorage.setItem("user", JSON.stringify(data));
};

const readUserData = (): Promise<UserType | string> =>
  get(child(ref(database), `users/${getUserFromLocalStorage().uid}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());

        return snapshot.val() as UserType;
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
