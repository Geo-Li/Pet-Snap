import { auth, db } from "@/lib/firebase";
import { User } from "@firebase/auth";
import { get, ref, set } from "firebase/database";

export async function saveUserData(user: User) {
  if (!user) return;

  try {
    const userRef = ref(db, `users/${user.uid}`);
    await set(userRef, {
      userId: user.uid,
      displayName: user.displayName || "Anonymous",
      email: user.email,
      photoURL: user.photoURL,
      status: "online",
    });
  } catch (error) {
    console.error("Error saving user data", error);
    throw error;
  }
}

export async function getUserData(userId: string) {
  try {
    const userRef = ref(db, `users/${userId}`);
    const snapshot = await get(userRef);
    return snapshot.val();
  } catch (error) {
    console.error("Error fetching user data", error);
  }
}
