"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  expandButtonTitle?: string;
}

export function CollapsibleCodeBlock({
  expandButtonTitle = "View Code",
  className,
  children,
  ...props
}: CodeBlockProps) {
  const [isOpened, setIsOpened] = React.useState(false);

  return (
    <Collapsible open={isOpened} onOpenChange={setIsOpened}>
      <div className={cn("relative overflow-hidden my-4", className)} {...props}>
        <CollapsibleContent
          forceMount
          className={cn("overflow-hidden", !isOpened && "max-h-80")}
        >
          <div
            className={cn(
              "[&_pre]:my-0 [&_pre]:max-h-[650px] [&_pre]:pb-[100px]",
              !isOpened ? "[&_pre]:overflow-hidden" : "[&_pre]:overflow-auto]",
            )}
          >
            {children}
          </div>
        </CollapsibleContent>
        <div
          className={cn(
            "absolute flex items-center justify-center bg-gradient-to-b from-background/10 to-background to-90% p-2 ",
            isOpened ? "inset-x-0 -bottom-6 h-28  from-gray-900/20" : "inset-0 ",
          )}
        >
          <CollapsibleTrigger asChild>
            <Button variant="default" className="mb-4 h-8 text-xs font-semibold">
              {isOpened ? "Collapse" : expandButtonTitle}
            </Button>
          </CollapsibleTrigger>
        </div>
      </div>
    </Collapsible>
  );
}