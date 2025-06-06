import React from "react";
import { LayoutGrid, SettingsIcon, Trash2, User2 } from "lucide-react";

import type { LucideIcon } from "lucide-react";

import { siteConfig } from "@/config/site";
import { useAppState } from "@/hooks/use-app-state";
import { cn } from "@/lib/utils";
import { Logo } from "../icons";
import  SettingsPage  from "../settings";
import { SignOut } from "../sign-out";
import { Trash } from "../trash";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Workspaces } from "../workspaces";
import { Folders } from "./folders";
import { FoldersCollapsed } from "./folders-collapsed";
import { NavDialog } from "./nav-dialog";

type SidebarProps = React.ComponentProps<"aside"> & {
  isCollapsed: boolean;
};

type NavItem = {
  title: string;
  description: string;
  icon: LucideIcon;
  content: React.FC;
};

const navItems: NavItem[] = [
  {
    title: "My Workspaces",
    description: "Manage your workspaces",
    icon: LayoutGrid,
    content: Workspaces,
  },
  {
    title: "Settings",
    description: "Manage your settings",
    icon: SettingsIcon,
    content: SettingsPage,
  },
  {
    title: "Trash",
    description: "Manage your trash",
    icon: Trash2,
    content: Trash,
  },
];

export function Sidebar({ isCollapsed, className, ...props }: SidebarProps) {
  const { user } = useAppState();

  return (
    <aside
      className={cn("relative z-40 hidden lg:block", className)}
      {...props}
    >
      <div
        className={cn(
          "sticky inset-y-0 flex min-h-screen flex-col gap-2",
          !isCollapsed && "overflow-hidden"
        )}
      >
        <div
          className={cn(
            "flex",
            isCollapsed ?
              "my-px h-14 border-b"
            : "my-1 ml-4 mr-2 items-center gap-2"
          )}
        >
          {!isCollapsed && (
            <span className="font-handwriting text-2xl font-medium ml-10 mt-3">
              DeskCollab
            </span>
          )}
        </div>

        <nav className="flex flex-col items-center justify-center gap-1 px-4">
          {navItems.map(({ title, description, icon, content: Content }) =>
            isCollapsed ?
              <Tooltip key={title} delayDuration={0}>
                <TooltipTrigger asChild>
                  <NavDialog
                    title={title}
                    icon={icon}
                    description={description}
                    isCollapsed
                  >
                    <Content />
                  </NavDialog>
                </TooltipTrigger>
                <TooltipContent side="right">{title}</TooltipContent>
              </Tooltip>
            : <NavDialog
                key={title}
                title={title}
                icon={icon}
                description={description}
              >
                <Content />
              </NavDialog>
          )}
        </nav>

        <Separator className={isCollapsed ? "block" : "hidden"} />

        {isCollapsed ?
          <FoldersCollapsed />
        : <Folders />}

        <div
          className={cn(
            "absolute z-10 transition-all animate-in fade-in-0 zoom-in-0 slide-in-from-bottom-full [animation-duration:500ms]",
            isCollapsed ? "inset-x-0 bottom-1" : (
              "inset-x-2 bottom-2 flex items-center gap-2 rounded-full border bg-background/10 p-2 shadow backdrop-blur-md hover:shadow-xl"
            )
          )}
        >
              <SignOut
                size="icon"
                variant="ghost"
                className="ml-auto shrink-0 rounded-full text-muted-foreground"
              />
        </div>
      </div>
    </aside>
  );
}
