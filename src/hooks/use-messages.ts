import { useEffect, useState } from "react";
// utils
import { createChatId } from "@/utils/ids";
import {
  ref,
  query,
  push,
  orderByChild,
  limitToLast,
  onChildAdded,
  onChildChanged,
  onValue,
  off,
  get,
  set,
  serverTimestamp,
} from "firebase/database";
import { auth, db } from "@/lib/firebase";
import { Message } from "@/types/chat";

export function useMessages(otherUserId: string, limit: number = 20) {
  const [messages, setMessages] = useState<Map<string, Message>>(new Map());
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

    // Listener for new messages update
    const newMessageListener = onChildAdded(recentMessagesQuery, (snapshot) => {
      setMessages((prevMessages) => {
        const newMessages = new Map(prevMessages);
        newMessages.set(snapshot.key!, {
          id: snapshot.key!,
          ...snapshot.val(),
        });
        return newMessages;
      });
      setLoading(false);
    });

    // Listener for updates on old messages
    const messagesUpdateListener = onChildChanged(messagesRef, (snapshot) => {
      setMessages((prevMessages) => {
        const updatedMessages = new Map(prevMessages);
        updatedMessages.set(snapshot.key!, {
          id: snapshot.key!,
          ...snapshot.val(),
        });
        return updatedMessages;
      });
      setLoading(false);
    });

    return () => {
      //   off(messagesRef);
      newMessageListener();
      messagesUpdateListener();
    };
  }, [otherUserId]);

  async function sendMessage(content: string, imageUrl?: string) {
    if (!auth.currentUser) return;
    const chatId = createChatId(auth.currentUser.uid, otherUserId);
    const messagesRef = ref(db, `chats/${chatId}/messages`);

    await push(messagesRef, {
      content,
      imageUrl,
      userId: auth.currentUser.uid,
      senderName: auth.currentUser.displayName || "",
      timestamp: serverTimestamp(),
    });
  }

  return {
    messages: Array.from(messages.values()).sort(
      (oldMessage, newMessage) => oldMessage.timestamp - newMessage.timestamp,
    ),
    loading,
    sendMessage,
  };
}
