'use server';
import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { User } from '@/lib/types';

type AddStudentData = Omit<User, 'id' | 'role'>;
type ServerResponse = { success: boolean; error?: string };

export async function handleAddStudent(
  studentData: AddStudentData
): Promise<ServerResponse> {
  try {
    // Note: In a real app, you would also create a user in Firebase Authentication
    // For this demo, we are just storing the user info in Firestore.
    await addDoc(collection(db, 'users'), {
      ...studentData,
      role: 'student',
    });
    return { success: true };
  } catch (e: any) {
    console.error('Error adding document: ', e);
    return { success: false, error: e.message };
  }
}

export async function handleRemoveStudent(userId: string): Promise<ServerResponse> {
    try {
        await deleteDoc(doc(db, 'users', userId));
        return { success: true };
    } catch (e: any) {
        console.error('Error deleting document: ', e);
        return { success: false, error: e.message };
    }
}
