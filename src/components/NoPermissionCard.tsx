import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

export function NoPermissionCard({ message }: { message?: string }) {
  return (
    <div className="p-4 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-md mt-4">
      {message ??
        "Your current plan does not support banner customization. Please upgrade to enable this feature. Or contact support if you believe this is an error."}

      <Button size="sm" className="mt-2" asChild>
        <Link href="/dashboard/subscription">Upgrade Account</Link>
      </Button>
    </div>
  );
}
