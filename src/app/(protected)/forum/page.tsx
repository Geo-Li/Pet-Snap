"use client";

// system packages
import { useState, useEffect } from "react";
// components
import MainContent from "./_components/MainContent";
import ChatBox from "@/components/chat/ChatBox";
import FocusedImage from "@/components/image/FocusedImage";
// tests

export default function ForumPage() {
  const [isImageFocused, setIsImageFocused] = useState<boolean>(false);

  return (
    <div className="h-full w-full">
      <MainContent />
      <ChatBox />
    </div>
  );
}
