"use client"

import Link from "next/link"
import { useState } from "react"
import { ChevronRight, File, FileText, Folder, ImageIcon, MoreVertical, Plus, Upload } from "lucide-react"

import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Card, CardContent } from "~/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { ScrollArea } from "~/components/ui/scroll-area"
import { Separator } from "~/components/ui/separator"

interface FileItem {
  id: string
  name: string
  type: "file" | "folder" | "image" | "document"
  size?: string
  modified: string
  path: string
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
]

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
]

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
]

export default function Component() {
  const [currentPath, setCurrentPath] = useState<string>("/")
  const [currentFiles, setCurrentFiles] = useState<FileItem[]>(mockFiles)

  const handleFolderClick = (path: string) => {
    setCurrentPath(path)
    if (path === "/documents") {
      setCurrentFiles(documentsFiles)
    } else if (path === "/images") {
      setCurrentFiles(imagesFiles)
    } else {
      setCurrentFiles(mockFiles)
    }
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "folder":
        return <Folder className="w-8 h-8 text-blue-500" />
      case "image":
        return <ImageIcon className="w-8 h-8 text-green-500" />
      case "document":
        return <FileText className="w-8 h-8 text-yellow-500" />
      default:
        return <File className="w-8 h-8 text-gray-500" />
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <div className="flex flex-col flex-1">
        <header className="border-b">
          <div className="container flex items-center justify-between py-4">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" className="text-sm font-medium" onClick={() => handleFolderClick("/")}>
                My Drive
              </Button>
              {currentPath !== "/" && (
                <>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  <Button variant="ghost" className="text-sm font-medium">
                    {currentPath.substring(1)}
                  </Button>
                </>
              )}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload file
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Folder className="w-4 h-4 mr-2" />
                  New folder
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <ScrollArea className="flex-1 p-6">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {currentFiles.map((file) => (
                <Card key={file.id} className="group relative hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      {getIcon(file.type)}
                      <div className="flex-1 space-y-1 min-w-0">
                        {file.type === "folder" ? (
                          <button
                            onClick={() => handleFolderClick(file.path)}
                            className="text-sm font-medium leading-none hover:underline truncate block w-full text-left"
                          >
                            {file.name}
                          </button>
                        ) : (
                          <Link
                            href={file.path}
                            className="text-sm font-medium leading-none hover:underline truncate block"
                          >
                            {file.name}
                          </Link>
                        )}
                        <div className="flex items-center text-xs text-muted-foreground">
                          {file.size && (
                            <>
                              <Badge variant="secondary" className="rounded-sm">
                                {file.size}
                              </Badge>
                              <Separator orientation="vertical" className="mx-2 h-3" />
                            </>
                          )}
                          <span>{file.modified}</span>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100">
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[160px]">
                          <DropdownMenuItem>Download</DropdownMenuItem>
                          <DropdownMenuItem>Rename</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
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
  )
}

