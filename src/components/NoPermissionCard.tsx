import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

export function NoPermissionCard({
  message,
  children,
}: {
  message?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="p-4 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-md mt-4 flex flex-col">
      {message ??
        "Your current plan does not support banner customization. Please upgrade to enable this feature. Or contact support if you believe this is an error."}

      {children}

      <Button size="sm" className="mt-2 max-w-fit self-center" asChild>
        <Link href="/dashboard/subscription">Upgrade Account</Link>
      </Button>
    </div>
  );
}
