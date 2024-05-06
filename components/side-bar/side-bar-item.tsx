"use client";
import { usePathname, useRouter } from "next/navigation";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}
export const SidebarItem = ({ icon: Icon, href, label }: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = pathname == href && pathname?.startsWith(`${href}`);

  const onClick = () => {
    router.push(href);
  };

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-x-2 text-accent-foreground text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
        isActive &&
          "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700"
      )}
    >
      <>
        <div className="flex items-center gap-x-2 py-4">
          <Icon
            size={22}
            className={cn("text-accent-foreground", isActive && "text-sky-700")}
          />
          {label}
        </div>
        <div
          className={cn(
            "ml-auto opacity-0 border-2 border-sky-700 h-full transition-all",
            isActive && "opacity-100"
          )}
        />
      </>
    </Link>
  );
};
