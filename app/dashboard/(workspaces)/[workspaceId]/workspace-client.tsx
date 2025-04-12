"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import SettingsPage from "@/components/settings";
import { 
  Plus, 
  Search, 
  Settings, 
  PanelLeft, 
  FolderIcon, 
  FilePlus, 
  FolderPlus,
  MoreHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface Workspace {
  id: string;
  title: string;
  description?: string | null;
  // Add other fields you need from your database
}

export default function WorkspaceClientPage({ 
  workspace 
}: { 
  workspace: Workspace 
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const pathname = usePathname();
  const workspaceId = pathname.split("/")[2];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  if (!workspace) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p>Workspace not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-background">
      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-14 items-center justify-between border-b px-6">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar}
            >
              <PanelLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold">{workspace.title}</h1>
          </div>

          <div className="flex items-center gap-2">
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <FilePlus className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>New File</TooltipContent>
            </Tooltip>

            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <FolderPlus className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>New Folder</TooltipContent>
            </Tooltip>

            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={toggleSettings}
                >
                  <Settings className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Settings</TooltipContent>
            </Tooltip>
          </div>
        </header>

        {/* Workspace content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="mx-auto max-w-6xl">
            {/* Workspace title */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold">{workspace.title}</h2>
              <p className="text-muted-foreground">
                {workspace.description || "Organize your work and collaborate with your team"}
              </p>
            </div>

            {/* Recent files section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Recent Files</h3>
                <Button variant="ghost" size="sm">
                  View all
                </Button>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((item) => (
                  <div 
                    key={item} 
                    className="group relative rounded-lg border p-4 hover:border-primary transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <FolderIcon className="h-6 w-6 text-primary" />
                        <span className="font-medium">File {item}</span>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 opacity-0 group-hover:opacity-100"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Rename</DropdownMenuItem>
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Updated {item} hour{item !== 1 ? 's' : ''} ago
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* All folders section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">All Folders</h3>
                <div className="flex items-center gap-2">
                  <Input 
                    placeholder="Search folders..." 
                    className="w-60"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    New Folder
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <Link 
                    href={`/dashboard/${workspaceId}/folder-${item}`} 
                    key={item} 
                    className="group relative rounded-lg border p-4 hover:border-primary transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <FolderIcon className="h-6 w-6 text-primary" />
                        <span className="font-medium">Folder {item}</span>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 opacity-0 group-hover:opacity-100"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Rename</DropdownMenuItem>
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {item} file{item !== 1 ? 's' : ''} · Updated {item} day{item !== 1 ? 's' : ''} ago
                    </p>
                  </Link>
                ))}
                <Button 
                  variant="outline" 
                  className="flex items-center justify-center h-full min-h-[120px] rounded-lg border-dashed"
                >
                  <div className="flex flex-col items-center gap-2">
                    <FolderPlus className="h-8 w-8" />
                    <span>Create new folder</span>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      {/* Settings Panel */}
      {isSettingsOpen && (
        <SettingsPage />
      )}
    </div>
  );
}