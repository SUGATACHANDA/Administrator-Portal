"use client"

import { CuisineColumns } from "./columns"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { CopyIcon, Edit3Icon, MoreVerticalIcon, Trash2Icon } from "lucide-react"
import toast from "react-hot-toast"
import { deleteObject, ref } from "firebase/storage"
import { storage } from "@/lib/firebase"
import axios from "axios"
import { AlertModal } from "@/components/modal/alert-modal"

interface CellActionProps{
    data: CuisineColumns
}

export const CellAction = ({data} : CellActionProps) => {

    const router = useRouter()
    const params = useParams()

    const [isLoading, setIsLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id)
        toast.success("Cuisine Id Copied to Clipboard")
    }

    const onDelete = async () => {
      try {
        setIsLoading(true);
        await axios.delete(
          `/api/${params.storeId}/cuisines/${data.id}`
        );
        toast.success("Cuisine Deleted Successfully");
        router.push(`/${params.storeId}/cuisines`);
        router.refresh();
        // console.log(response)
      } catch (error) {
        toast.error("Something Went Wrong");
      } finally {
        setIsLoading(false);
        setIsOpen(false);
      }
    };

  return (
    <>
    <AlertModal isOpen={isOpen} onClose={() => setIsOpen(false)} onConfirm={onDelete} loading={isLoading}/>
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button className="h-8 w-8 p-0" variant={"ghost"}>
                <span className="sr-only">Open</span>
                <MoreVerticalIcon  className="h-4 w-4"/>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
            <DropdownMenuItem onClick={() => onCopy(data.id)} className="cursor-pointer">
                <CopyIcon className="h-4 w-4 mr-2"/>
                Copy Id
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => router.push(`/${params.storeId}/cuisines/${data.id}`)} className="cursor-pointer">
                <Edit3Icon className="h-4 w-4 mr-2"/>
                Update
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => setIsOpen(true)} className="cursor-pointer">
                <Trash2Icon className="h-4 w-4 mr-2"/>
                Delete
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
    </>
  )
}
