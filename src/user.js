import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { render } from './dom/render';

async function signIn() {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(), provider);
}

function signOutUser() {
  console.log('signing out...');
  signOut(getAuth());
}

function initFirebaseAuth() {
  onAuthStateChanged(getAuth(), authStateObserver);
}

function getUserName() {
  return getAuth().currentUser.displayName;
}

function authStateObserver(user) {
  if (user) {
    render.userSignedIn();
  } else {
    render.userSignedOut();
  }
}

export { initFirebaseAuth, getUserName, signIn, signOutUser };
