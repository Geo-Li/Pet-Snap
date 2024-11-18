import Image from "next/image";
import { MyUser } from "@/types/realtime_db";
import { Message } from "@/types/chat";

type ReplyProps = {
  otherUser: MyUser | null;
  message: Message;
};

export default function Reply({ otherUser, message }: ReplyProps) {
  return (
    <div className="flex items-start space-x-3">
      {/* User avatar */}
      <Image
        src={otherUser?.photoURL ?? "/default-image.png"}
        alt="User avatar"
        width={30}
        height={30}
        className="rounded-full"
      />

      {/* Message content */}
      <div className="max-w-xs rounded-lg bg-gray-100 p-3 shadow-sm">
        {message.imageUrl && (
          <Image
            src={message.imageUrl}
            alt="Received image"
            width={200}
            height={200}
            className="mb-2 rounded-lg"
          />
        )}
        <p className="text-sm">{message.content}</p>
        <p className="text-xs text-gray-500">
          {new Date(message.timestamp || 0).toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}
