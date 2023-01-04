import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  Timestamp,
  query,
  orderBy,
  onSnapshot,
  setDoc,
} from 'firebase/firestore';
import { db } from './firebase';

// get user id from userauth

const userId = 'tDDCF575skbbu5ZXq1bg';

const addTodo = async ({ title, description, dueDate, priority, project }) => {
  console.log('adding todo to firebase');
  try {
    const userRef = collection(db, 'users', userId, project);
    const projectRef = userRef;
    console.log(projectRef);
    await addDoc(projectRef, {
      title,
      description,
      dueDate,
      priority,
    });
  } catch (err) {
    alert(err);
  }
};

export { addTodo };
