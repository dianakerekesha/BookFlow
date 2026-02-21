import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, firestore } from './firebase';

export const doCreateUserWithEmailAndPassword = async (
  email: string,
  password: string,
  name: string,
) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );

  const user = userCredential.user;

  await setDoc(doc(firestore, 'users', user.uid), {
    name: name,
    email: email,
  });

  return userCredential;
};

export const doSingInWithEmailAndPassword = (
  email: string,
  password: string,
) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSingInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);

  const user = result.user;

  await setDoc(
    doc(firestore, 'users', user.uid),
    {
      name: user.displayName || '',
      email: user.email || '',
    },
    { merge: true },
  );

  return result;
};

export const doSingOut = () => {
  return auth.signOut();
};
