import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

export function ByMshfr() {
  return (
    <a
      className={cn(
        buttonVariants({ variant: "outline", size: "sm" }),
        "font-semibold absolute top-6 right-6"
      )}
      target="_blank"
      href="https://mshfr.co.uk/"
      tabIndex={-1} // TODO: remove tabIndex
    >
      by mshfr
    </a>
  );
}
