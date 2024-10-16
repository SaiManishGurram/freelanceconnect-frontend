// src/app/api/register/route.ts
import { NextResponse } from 'next/server';
import { auth, db } from '../../../services/firebase'; // Adjust the path if needed
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import axios from 'axios';
import endpoints from '@/config/endpoints';

export async function POST(request: Request) {
    const { email, password, role } = await request.json();

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        // Save user details in Firestore
        await setDoc(doc(db, 'users', userCredential.user.uid), {
            email: userCredential.user.email,
            role: role, // Save the user's role (freelancer or employer)
        });

        // Step 2: Send user data to backend to create a MongoDB entry
        await axios.post(endpoints.register, {
            uid: userCredential.user.uid,
            email: userCredential.user.email,
            role: role,
        });

        // Optionally, return additional user info
        return NextResponse.json({ user: userCredential.user }, { status: 201 });
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json({ error: (error as Error).message }, { status: 400 });
    }
}
