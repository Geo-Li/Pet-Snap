// system packages
import { cn } from "@/lib/utils";
import { logOut } from "@/lib/firebase";
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
  const { user } = useUserAuth();

  return (
    <Sidebar
      variant="sidebar"
      className={cn("border-r-[1px] border-stone-900", className)}
    >
      <SidebarHeader className="bg-white p-4 text-2xl">
        Recent Chats
      </SidebarHeader>
      <SidebarContent className="bg-white" />
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
