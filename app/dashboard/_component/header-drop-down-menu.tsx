"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";
import { signOut } from "next-auth/react";
import { toast, Toaster } from "sonner";
export function HeaderDropDownMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <User className="xl:mr-20"></User>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Setting</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem
          onClick={async () => {

            await signOut();
            toast.success("Signed out");

          }}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
