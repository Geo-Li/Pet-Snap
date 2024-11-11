"use client";

// system packages
import { useState, useEffect } from "react";
// components
import MainContent from "../../_templates/page/MainContent";
import ChatBox from "../../_components/chat/ChatBox";
import FocusedImage from "@/app/_components/image/FocusedImage";
// tests

export default function ForumPage() {
  const [isImageFocused, setIsImageFocused] = useState<boolean>(false);

  return (
    <div className="h-full w-full">
      <MainContent />
      <ChatBox />
      {/* <div
        className={`absolute inset-0 flex items-center justify-center ${isImageFocused ? "z-30" : ""}`}
      >
        <FocusedImage
          src="/Cat Watching.JPG"
          alt="Cat Watching"
          width={320}
          height={200}
          className="rounded-lg border-4 border-emerald-300 p-2"
        />
      </div> */}
    </div>
  );
}
