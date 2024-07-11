import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore'; // Import necessary Firestore functions

// Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJey0hH9sRhW6ljA5Klyvo8h5vGpBTeeA",
  authDomain: "todolist-6ddcb.firebaseapp.com",
  projectId: "todolist-6ddcb",
  storageBucket: "todolist-6ddcb.appspot.com",
  messagingSenderId: "309844421899",
  appId: "1:309844421899:web:dc9f4dbc4c9f9d93f9c60e",
  measurementId: "G-V9VS0F77PB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore instance
export const db = getFirestore(app);

// Example functions to interact with Firestore
export const fetchTasks = async () => {
  const tasksCollection = collection(db, 'tasks');
  const snapshot = await getDocs(tasksCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addTask = async (taskDescription, taskDone) => {
  const tasksCollection = collection(db, 'tasks');
  await addDoc(tasksCollection, { description: taskDescription, done: taskDone });
};

export const removeTask = async (taskId) => {
  try {
    const taskDocRef = doc(db, 'tasks', taskId);
    await deleteDoc(taskDocRef);
    console.log('Task successfully deleted from Firestore');
  } catch (error) {
    console.error('Error removing task:', error);
    throw error;
  }
};

export const subscribeToTaskChanges = (updateCallback) => {
  // Subscribe to changes in the tasks collection
  const tasksCollection = collection(db, 'tasks');
  return onSnapshot(tasksCollection, snapshot => {
    const updatedTasks = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    updateCallback(updatedTasks);
  });
};

export async function updateTaskStat(id, data) {
  console.log("Clicked: ",id, data)
  try {
    const updateRef = doc(db, `tasks/${id}`); // Create reference to the document
    await updateDoc(updateRef, {done: data}); 
    return true;
  } catch (e) {

    return false;
  }
}







