import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  initializeFirestore,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter,
  updateDoc,
  where,
  persistentLocalCache,
} from 'firebase/firestore';
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = initializeFirestore(firebaseApp, {
  localCache: persistentLocalCache(),
});

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(firebaseApp);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(firebaseApp);

// Set an observer on the Auth object
export const onAuthStateChangedListener = callback => {
  return onAuthStateChanged(auth, callback);
};

// Add a new document in collection "users"
const createUserDocument = async userData => {
  const userDocRef = doc(db, 'users', userData.id);
  await setDoc(userDocRef, {
    name: userData.name,
    email: userData.email,
    age: userData.age,
    country: userData.country,
  });
};

// Add a new document in Collection "songs" and return the document
const createSongsDocument = async song => {
  const songsCollection = collection(db, 'songs');
  const songDocRef = await addDoc(songsCollection, song);
  return await getDoc(songDocRef);
};

// Add a new document in Collection "comments"
const createCommentDocument = async comment => {
  const commentsCollection = collection(db, 'comments');
  await addDoc(commentsCollection, comment);
};

// Register a User with Email and Password
const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

// Log a User In with Email and Password
const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

// Log a User Out
const singOutAuthUser = async () => {
  return await signOut(auth);
};

// Update a User Profile
const updateUserProfile = async displayName => {
  await updateProfile(auth.currentUser, {
    displayName: displayName,
  });
};

// Upload a File, file must come from the JavaScript File API'
const uploadFile = (folder, file) => {
  const storageRef = ref(storage, folder + '/' + file.name);
  return uploadBytesResumable(storageRef, file);
};

// Get the Download URL for a specific File
const getPublicUrl = async fileRef => {
  return await getDownloadURL(fileRef);
};

// Retrieve all Song Documents, with or without Pagination
const getAllSongs = async (pageSize, lastDocId) => {
  let q = query(collection(db, 'songs'));

  // Pagination with page size and the index of the last document
  if (pageSize) {
    if (lastDocId) {
      const lastSongRef = doc(db, 'songs', lastDocId);
      const lastSongDoc = await getDoc(lastSongRef);

      q = query(
        collection(db, 'songs'),
        orderBy('modified_name'),
        startAfter(lastSongDoc),
        limit(pageSize)
      );
    } else {
      q = query(
        collection(db, 'songs'),
        orderBy('modified_name'),
        limit(pageSize)
      );
    }
  }

  return await getDocs(q);
};

// Retrieve all Comment Documents for a given SongId
const getSongComments = async songId => {
  const q = query(collection(db, 'comments'), where('songId', '==', songId));
  return await getDocs(q);
};

// Retrieve all Song Documents for a given UserId
const getUserSongs = async userId => {
  const q = query(collection(db, 'songs'), where('userId', '==', userId));
  return await getDocs(q);
};

// Retrieve a Song Document by a given SongId
const getSong = async songId => {
  const docRef = doc(db, 'songs', songId);
  return await getDoc(docRef);
};

// Update a Song Document in the Songs Collection
const updateSong = async (songId, newName, newGenre) => {
  const songDoc = doc(db, 'songs', songId);
  await updateDoc(songDoc, {
    modified_name: newName,
    genre: newGenre,
  });
};

// Update the Comment Count of a Song
const updateCommentCount = async (songId, commentCount) => {
  const songDoc = doc(db, 'songs', songId);
  await updateDoc(songDoc, {
    comment_count: commentCount,
  });
};

// Delete a Song Document in the Songs Collection & Remove it from the File Storage
const deleteSong = async song => {
  const songDoc = doc(db, 'songs', song.docId);
  const fileRef = ref(storage, 'songs/' + song.original_name);
  await deleteDoc(songDoc);
  await deleteObject(fileRef);
};

export default {
  createAuthUserWithEmailAndPassword,
  createCommentDocument,
  createSongsDocument,
  createUserDocument,
  deleteSong,
  onAuthStateChangedListener,
  getAllSongs,
  getPublicUrl,
  getSong,
  getSongComments,
  getUserSongs,
  signInAuthUserWithEmailAndPassword,
  singOutAuthUser,
  updateCommentCount,
  updateSong,
  updateUserProfile,
  uploadFile,
};
