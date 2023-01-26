import { signInWithPopup, GoogleAuthProvider, OAuthCredential, signOut } from 'firebase/auth';
import { auth } from './firebase';

const provider = new GoogleAuthProvider();

const logIn = () =>
  signInWithPopup(auth, provider).then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result) as OAuthCredential;
    const token = credential.accessToken;

    // The signed-in user info.
    const user = result.user;
    return user;
  });

const logOut = () => signOut(auth);

export { logIn, logOut };
