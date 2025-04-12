'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { SignOut } from "./sign-out";

// UI Components
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';

// Icons
import {
  User,
  Settings,
  Lock,
  Share,
  LogOut,
  Trash2,
  Plus,
  ExternalLink,
} from 'lucide-react';

const SettingsPage = () => {
  const [workspaceTitle, setWorkspaceTitle] = useState('My Workspace');
  const [permission, setPermission] = useState('Private');
  const [collaborators, setCollaborators] = useState([]);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      {/* Workspace Settings */}
      <div className="mb-8">
        <p className="flex items-center gap-2 font-medium">
          Workspace Settings
        </p>
        <Separator className="my-4" />
        
        <div className="space-y-4">
          <div>
            <label htmlFor="workspaceName" className="text-sm text-muted-foreground block mb-1">
              Workspace Name
            </label>
            <Input
              id="workspaceName"
              value={workspaceTitle}
              onChange={(e) => setWorkspaceTitle(e.target.value)}
              className="max-w-md"
            />
          </div>
          
          <div>
            <label htmlFor="workspaceLogo" className="text-sm text-muted-foreground block mb-1">
              Workspace Logo
            </label>
            <Input
              id="workspaceLogo"
              type="file"
              accept="image/*"
              className="max-w-md"
            />
          </div>
          
          <div className="mt-4">
            <label htmlFor="permissions" className="text-sm text-muted-foreground block mb-1">
              Permissions
            </label>
            {/* Hardcoded dropdown */}
            <div className="w-full max-w-md border rounded-md p-2">
              <div 
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setPermission(permission === 'Private' ? 'Shared' : 'Private')}
              >
                {permission === 'Private' ? <Lock size={16} /> : <Share size={16} />}
                <span>{permission}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Collaborators */}
      {permission === 'Shared' && (
        <div className="mb-8">
          <Button 
            variant="outline" 
            className="mb-2"
          >
            <Plus size={16} className="mr-2" />
            Add Collaborator
          </Button>
          
          <ScrollArea className="h-[150px] border rounded-md">
            <div className="flex items-center justify-center h-full text-muted-foreground">
              No collaborators yet
            </div>
          </ScrollArea>
        </div>
      )}
      
      {/* Profile Settings */}
      <div className="mb-8">
        <p className="flex items-center gap-2 font-medium">
          <User size={20} />
          Profile Settings
        </p>
        <Separator className="my-4" />
        
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="w-16 h-16">
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          
          <div>
            <div className="text-sm text-muted-foreground mb-1">user@example.com</div>
            <Input
              id="avatarUpload"
              type="file"
              accept="image/*"
              className="max-w-sm"
            />
          </div>
        </div>
        
        <SignOut
                size="icon"
                variant="ghost"
                className="ml-auto shrink-0 rounded-full text-muted-foreground"
              />
      </div>
    </div>
  );
};

export default SettingsPage;