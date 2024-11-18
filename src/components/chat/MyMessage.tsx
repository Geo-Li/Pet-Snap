import Image from "next/image";
import { User } from "@firebase/auth";
import { Message } from "@/types/chat";

type MyMessageProps = {
  currUser: User | null;
  message: Message;
};

export default function MyMessage({ currUser, message }: MyMessageProps) {
  return (
    <div className="flex items-end justify-end space-x-3">
      <div className="max-w-xs rounded-lg bg-emerald-100 p-3 shadow-sm">
        {message.imageUrl && (
          <Image
            src={message.imageUrl}
            alt="Sent image"
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

      <Image
        src={currUser?.photoURL || "/default-image.png"}
        alt="User avatar"
        width={30}
        height={30}
        className="rounded-full"
      />
    </div>
  );
}
