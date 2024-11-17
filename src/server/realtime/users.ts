import { auth, db } from "@/lib/firebase";
import { User } from "@firebase/auth";
import { ref, set } from "firebase/database";

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
