// system packages
import { cn } from "@/lib/utils";
// shadcn components
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
} from "@/components/ui/sidebar";

type SideBarComponentProps = {
  children?: React.ReactNode;
  className?: string;
};

export default function SideBarComponent({
  children,
  className,
}: SideBarComponentProps) {
  return (
    <Sidebar
      variant="sidebar"
      className={cn("border-r-[1px] border-stone-900", className)}
    >
      <SidebarHeader className="bg-white p-4 text-2xl">
        Recent Chats
      </SidebarHeader>
      <SidebarContent className="bg-white" />
    </Sidebar>
  );
}
