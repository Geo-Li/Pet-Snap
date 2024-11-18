import { useEffect, useState } from "react";
import {
  ref,
  query,
  push,
  orderByChild,
  limitToLast,
  onChildAdded,
  off,
  serverTimestamp,
} from "firebase/database";
import { auth, db } from "@/lib/firebase";
import { createChatId } from "@/utils/ids";
import { Message } from "@/types/chat";
import { storeMessage } from "@/server/realtime/messages";

export function useMessages(otherUserId: string, limit = 20) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.currentUser || !otherUserId) return;

    const chatId = createChatId(auth.currentUser.uid, otherUserId);
    const messagesRef = ref(db, `chats/${chatId}/messages`);
    const recentMessagesQuery = query(
      messagesRef,
      orderByChild("timestamp"),
      limitToLast(limit),
    );

    // Listener for new messages
    const newMessageListener = onChildAdded(recentMessagesQuery, (snapshot) => {
      const message = snapshot.val() as Message;
      if (!message) return;

      setMessages((prevMessages) => {
        // Check if the message already exists
        if (prevMessages.some((msg) => msg.id === snapshot.key)) {
          return prevMessages;
        }
        // Add new message and sort by timestamp
        const newMessages = [
          ...prevMessages,
          { id: snapshot.key!, ...message },
        ];
        return newMessages.sort(
          (a, b) => (a.timestamp || 0) - (b.timestamp || 0),
        );
      });
      setLoading(false);
    });

    // Cleanup listener on unmount
    return () => {
      off(messagesRef);
    };
  }, [otherUserId, limit]);

  // Function to send a new message
  async function sendMessage(content: string, imageUrl?: string) {
    if (!auth.currentUser || !otherUserId) return;

    const chatId = createChatId(auth.currentUser.uid, otherUserId);
    await storeMessage(chatId, otherUserId, content, imageUrl);
  }

  // Return sorted messages and loading state
  return {
    messages,
    loading,
    sendMessage,
  };
}
