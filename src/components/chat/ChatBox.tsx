// system packages
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useMessages } from "@/hooks/use-messages";
import { getUserData } from "@/server/realtime/users";
import { auth } from "@/lib/firebase";
// types
import { MyUser } from "@/types/realtime_db";
// assets
import { ChevronUpIcon, ChevronDownIcon } from "lucide-react";
// shadcn components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// components
import MyMessage from "./MyMessage";
import Reply from "./Reply";

export default function ChatBox({ otherUserId }: { otherUserId?: string }) {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [otherUser, setOtherUser] = useState<MyUser | null>(null);
  const [newMessage, setNewMessage] = useState<string>("");
  const { messages, loading, sendMessage } = useMessages(otherUserId || "");

  useEffect(() => {
    if (!otherUserId) return;

    const fetchUserData = async () => {
      const userData = await getUserData(otherUserId);
      setOtherUser(userData);
    };

    fetchUserData();
  }, [otherUserId]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!newMessage.trim() || !otherUserId) return;
    await sendMessage(newMessage);
    setNewMessage("");
  }

  return (
    <div className="fixed bottom-4 right-4 w-[600px] rounded-lg border bg-white shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-stone-900 p-2">
        <h3 className="px-2 text-xl font-semibold">
          {otherUserId ? otherUser?.displayName || "Anonymous" : "Chat"}
        </h3>
        <Button onClick={() => setIsOpen(!isOpen)} variant="ghost" size="icon">
          {isOpen ? <ChevronDownIcon /> : <ChevronUpIcon />}
        </Button>
      </div>

      {/* Chat content */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-[850px] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="h-[750px] overflow-y-auto p-4">
          {otherUserId ? (
            <div className="flex flex-col space-y-5">
              {messages.map((message) => (
                <div key={message.id} className="">
                  {message.senderId === otherUserId ? (
                    <Reply otherUser={otherUser} message={message} />
                  ) : (
                    <MyMessage currUser={auth.currentUser} message={message} />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-lg font-normal">
              Select someone from the sidebar to start chatting!
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="border-t border-stone-900 p-4">
          <div className="flex flex-row gap-5">
            <Input
              type="text"
              placeholder="Aa"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="w-full rounded-md border p-2 focus-visible:ring-emerald-300"
            />
            <Button
              type="button"
              onClick={handleSend}
              disabled={!otherUserId}
              variant="outline"
              className="shadow-md"
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
