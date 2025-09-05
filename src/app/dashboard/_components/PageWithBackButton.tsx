import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

type PageWithBackButtonProps = {
  pageTitle?: string;
  backButtonHref?: string;
  children: ReactNode;
};

export function PageWithBackButton({
  pageTitle,
  backButtonHref,
  children,
}: PageWithBackButtonProps) {
  return (
    <div className="grid grid-cols-[auto, 1fr] gap-x-4 gap-y-8">
      <Button size="icon" variant="outline" className="rounded-full" asChild>
        <Link href={backButtonHref ?? "/dashboard"}>
          <div className="sr-only">Back</div>
          <ArrowLeftIcon className="size-6" />
        </Link>
      </Button>
      <h1 className="text-2xl font-semibold self-center">{pageTitle}</h1>
      <div className="col-start-2">{children}</div>
    </div>
  );
}
