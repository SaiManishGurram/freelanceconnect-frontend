// src/services/authService.ts
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import axios from 'axios';
import endpoints from '@/config/endpoints';
import { auth, db } from './firebase'; // Adjust the path if needed

// Firebase login function
export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// Firebase registration function
export const registerUser = async (firstName: string, lastName: string, role: string, email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Additional user setup (e.g., saving name) can be done here
    // Save user details in Firestore
    await setDoc(doc(db, 'users', userCredential.user.uid), {
        firstName: firstName,
        lastName: lastName,
        email: userCredential.user.email,
        role: role, // Save the user's role (freelancer or employer)
    });

    // Step 2: Send user data to backend to create a MongoDB entry
    await axios.post(endpoints.register, {
        uid: userCredential.user.uid,
        firstName: firstName,
        lastName: lastName,
        email: userCredential.user.email,
        role: role,
    });
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// Function to get user role from Firestore
export const getUserRole = async (uid: string): Promise<string | null> => {
  const userDoc = await getDoc(doc(db, 'users', uid)); // Assuming roles are stored in users collection
  if (userDoc.exists()) {
    return userDoc.data()?.role || null; // Return role from Firestore
  }
  return null;
};