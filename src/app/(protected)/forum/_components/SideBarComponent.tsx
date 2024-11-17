// system packages
import { cn } from "@/lib/utils";
import { logOut } from "@/lib/firebase";
import { useState } from "react";
import { useUsers } from "@/hooks/use-users";
import { useRouter } from "next/navigation";
// contexts
import { useUserAuth } from "@/contexts/UserAuthContext";
// shadcn components
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

type SideBarComponentProps = {
  children?: React.ReactNode;
  className?: string;
};

export default function SideBarComponent({
  children,
  className,
}: SideBarComponentProps) {
  const router = useRouter();
  const { user } = useUserAuth();
  const { users, loading } = useUsers();
  const [userSearchQuery, setUserSearchQuery] = useState<string>("");

  const filteredUsers = users.filter(
    (user) =>
      user.displayName?.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(userSearchQuery.toLowerCase()),
  );

  const handleChat = (userId: string) => {
    router.push(`/forum/${userId}`);
  };

  return (
    <Sidebar
      variant="sidebar"
      className={cn("border-r-[1px] border-stone-900", className)}
    >
      <SidebarHeader className="bg-white p-4 text-2xl">
        Talk to Me!
      </SidebarHeader>
      <SidebarContent className="bg-white">
        {loading ? (
          <div className="flex h-32 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-500" />
          </div>
        ) : (
          <div className="mx-auto my-5 flex flex-row space-y-5">
            {filteredUsers.map((user) => (
              <div key={user.uid} className="">
                <Button
                  onClick={() => handleChat(user.userId)}
                  variant="outline"
                  className="border-stone-800 from-rose-100 to-stone-100 px-5 py-9 hover:bg-gradient-to-r"
                >
                  <span className="flex flex-col">
                    <span className="flex justify-start text-lg font-medium">
                      {user.displayName}
                    </span>
                    <span>{user.email}</span>
                  </span>
                </Button>
              </div>
            ))}
          </div>
        )}
      </SidebarContent>
      <SidebarFooter className="bg-white p-4">
        <div className="flex items-center justify-center">
          <Button
            onClick={logOut}
            variant="destructive"
            className="w-[50%] rounded-full px-6 py-5"
          >
            <span className="text-xl font-medium">Sign Out</span>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
