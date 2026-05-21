import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, sendPasswordResetEmail, signOut, updatePassword } from 'firebase/auth';
import { doc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/firebase/config';

export async function register(data: {firstName:string;lastName:string;email:string;phoneNumber:string;password:string;}) {
  const cred = await createUserWithEmailAndPassword(auth, data.email, data.password);
  const uid = cred.user.uid;
  await setDoc(doc(db, 'users', uid), { id: uid, ...data, password: undefined, profileImage: '', createdAt: new Date().toISOString(), isPremium: false, role: 'user', username: `${data.firstName.toLowerCase()}_${uid.slice(0,6)}`, lastLogin: new Date().toISOString() });
  await sendEmailVerification(cred.user);
  return cred.user;
}
export const login = async (email:string, password:string) => { const c = await signInWithEmailAndPassword(auth,email,password); await updateDoc(doc(db,'users',c.user.uid), { lastLogin: new Date().toISOString()}); return c.user; };
export const forgotPassword = (email:string) => sendPasswordResetEmail(auth,email);
export const logout = () => signOut(auth);
export const changePassword = async (newPassword:string) => { if (!auth.currentUser) throw new Error('No user'); await updatePassword(auth.currentUser,newPassword); };
