import { auth } from "@clerk/nextjs/server";
import React, { ReactNode } from "react";
import { NoPermissionCard } from "./NoPermissionCard";

type HasPermissionProps = {
  permission: (userId: string | null) => Promise<boolean>;
  renderFallback?: boolean;
  fallbackText?: string;
  children: ReactNode;
};

export async function HasPermission({
  permission,
  renderFallback = false,
  fallbackText = "You do not have permission to access this resource.",
  children,
}: HasPermissionProps) {
  const { userId } = await auth();
  const hasPermission = await permission(userId);

  if (hasPermission) return <>{children}</>;
  if (renderFallback) return <NoPermissionCard message={fallbackText} />;
  return null;
}
