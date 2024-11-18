import { auth, db } from "@/lib/firebase";
import { ref, push, serverTimestamp } from "firebase/database";

export async function storeMessage(
  chatId: string,
  otherUserId: string,
  content: string,
  imageUrl?: string,
) {
  if (!auth.currentUser) return;
  if (!imageUrl) imageUrl = "";
  const messagesRef = ref(db, `chats/${chatId}/messages`);

  await push(messagesRef, {
    content,
    imageUrl,
    senderId: auth.currentUser.uid,
    receiverId: otherUserId,
    timestamp: serverTimestamp(),
  });
}
