"use client";

// system packages
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
// components
import MainContent from "../_components/MainContent";
import ChatBox from "@/components/chat/ChatBox";
import FocusedImage from "@/components/image/FocusedImage";
// tests

export default function ForumPage() {
  const router = useRouter();
  const { otherUserId } = useParams();
  console.log(otherUserId);
  const [isImageFocused, setIsImageFocused] = useState<boolean>(false);

  return (
    <div className="h-full w-full">
      <MainContent />
      <ChatBox otherUserId={otherUserId as string} />
    </div>
  );
}
