// src/app/api/login/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../services/firebase'; // Adjust the path if needed

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    return NextResponse.json({
      message: 'User logged in successfully',
      user: {
        uid: user.uid,
        email: user.email,
        token: await user.getIdToken(),
      },
    });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
