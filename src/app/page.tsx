"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ChevronRight,
  File,
  FileText,
  Folder,
  ImageIcon,
  MoreVertical,
  Plus,
  Upload,
} from "lucide-react";

import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { ScrollArea } from "../components/ui/scroll-area";
import { Separator } from "../components/ui/separator";

interface FileItem {
  id: string;
  name: string;
  type: "file" | "folder" | "image" | "document";
  size?: string;
  modified: string;
  path: string;
}

const mockFiles: FileItem[] = [
  {
    id: "1",
    name: "Documents",
    type: "folder",
    modified: "Feb 21, 2024",
    path: "/documents",
  },
  {
    id: "2",
    name: "Images",
    type: "folder",
    modified: "Feb 20, 2024",
    path: "/images",
  },
  {
    id: "3",
    name: "report.pdf",
    type: "file",
    size: "2.5 MB",
    modified: "Feb 19, 2024",
    path: "/report.pdf",
  },
  {
    id: "4",
    name: "presentation.pptx",
    type: "document",
    size: "5.8 MB",
    modified: "Feb 18, 2024",
    path: "/presentation.pptx",
  },
  {
    id: "5",
    name: "profile.jpg",
    type: "image",
    size: "1.2 MB",
    modified: "Feb 17, 2024",
    path: "/profile.jpg",
  },
];

const documentsFiles: FileItem[] = [
  {
    id: "6",
    name: "Project Proposal",
    type: "document",
    size: "542 KB",
    modified: "Feb 21, 2024",
    path: "/documents/proposal.docx",
  },
  {
    id: "7",
    name: "Meeting Notes",
    type: "document",
    size: "128 KB",
    modified: "Feb 20, 2024",
    path: "/documents/notes.txt",
  },
];

const imagesFiles: FileItem[] = [
  {
    id: "8",
    name: "vacation.jpg",
    type: "image",
    size: "3.2 MB",
    modified: "Feb 21, 2024",
    path: "/images/vacation.jpg",
  },
  {
    id: "9",
    name: "screenshot.png",
    type: "image",
    size: "842 KB",
    modified: "Feb 20, 2024",
    path: "/images/screenshot.png",
  },
];

export default function Component() {
  const [currentPath, setCurrentPath] = useState<string>("/");
  const [currentFiles, setCurrentFiles] = useState<FileItem[]>(mockFiles);

  const handleFolderClick = (path: string) => {
    setCurrentPath(path);
    if (path === "/documents") {
      setCurrentFiles(documentsFiles);
    } else if (path === "/images") {
      setCurrentFiles(imagesFiles);
    } else {
      setCurrentFiles(mockFiles);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "folder":
        return <Folder className="h-8 w-8 text-blue-500" />;
      case "image":
        return <ImageIcon className="h-8 w-8 text-green-500" />;
      case "document":
        return <FileText className="h-8 w-8 text-yellow-500" />;
      default:
        return <File className="h-8 w-8 text-gray-500" />;
    }
  };

  return (
    <div className="bg-background flex h-screen">
      <div className="flex flex-1 flex-col">
        <header className="border-b">
          <div className="container flex items-center justify-between py-4">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                className="text-sm font-medium"
                onClick={() => handleFolderClick("/")}
              >
                My Drive
              </Button>
              {currentPath !== "/" && (
                <>
                  <ChevronRight className="text-muted-foreground h-4 w-4" />
                  <Button variant="ghost" className="text-sm font-medium">
                    {currentPath.substring(1)}
                  </Button>
                </>
              )}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload file
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Folder className="mr-2 h-4 w-4" />
                  New folder
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <ScrollArea className="flex-1 p-6">
          <div className="container">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {currentFiles.map((file) => (
                <Card
                  key={file.id}
                  className="group relative transition-shadow hover:shadow-md"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      {getIcon(file.type)}
                      <div className="min-w-0 flex-1 space-y-1">
                        {file.type === "folder" ? (
                          <button
                            onClick={() => handleFolderClick(file.path)}
                            className="block w-full truncate text-left text-sm font-medium leading-none hover:underline"
                          >
                            {file.name}
                          </button>
                        ) : (
                          <Link
                            href={file.path}
                            className="block truncate text-sm font-medium leading-none hover:underline"
                          >
                            {file.name}
                          </Link>
                        )}
                        <div className="text-muted-foreground flex items-center text-xs">
                          {file.size && (
                            <>
                              <Badge variant="secondary" className="rounded-sm">
                                {file.size}
                              </Badge>
                              <Separator
                                orientation="vertical"
                                className="mx-2 h-3"
                              />
                            </>
                          )}
                          <span>{file.modified}</span>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100"
                          >
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[160px]">
                          <DropdownMenuItem>Download</DropdownMenuItem>
                          <DropdownMenuItem>Rename</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
