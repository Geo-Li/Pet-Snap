"use client";

// system packages
import { useUserAuth } from "@/contexts/UserAuthContext";
import { redirect } from "next/navigation";
// assets
import { Loader2Icon } from "lucide-react";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useUserAuth();

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center text-blue-300">
        <div className="flex items-center gap-4">
          <Loader2Icon className="h-10 w-10 animate-spin" />
          <span className="text-4xl font-medium">Loading...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    redirect("/login");
  }

  return children;
}
