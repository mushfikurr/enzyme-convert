import { ByMshfr } from "@/components/by-mshfr";
import ConvertCard from "@/components/convert";
import ConvertSettings from "@/components/convert-settings/convert-settings";
import { Header } from "@/components/header";
import Processing from "@/components/processing";
import { GridBackground } from "@/components/ui/grid-background";
import { Toaster } from "@/components/ui/sonner";
import { FfmpegProvider } from "@/lib/context/ffmpeg-context";
import db from "@/lib/db/db";
import { schema } from "@/lib/schema/conversion-types";
import "@fontsource-variable/geist-mono";
import { createRootRoute, stripSearchParams } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { useEffect } from "react";

const DEFAULT_CONVERSION_PARAMS = {
  source: "",
  target: "",
};

export const Route = createRootRoute({
  component: RootComponent,
  validateSearch: zodValidator(schema.conversionParams),
  search: {
    middlewares: [stripSearchParams(DEFAULT_CONVERSION_PARAMS)],
  },
});

function RootComponent() {
  const conversionParams = Route.useSearch();
  useEffect(() => {
    db.open().catch((error) => {
      console.error("Failed to open database:", error);
    });
  }, []);

  return (
    <FfmpegProvider>
      <div className="font-geistMono w-full min-h-screen flex flex-col gap-6 items-center justify-center relative">
        <div className="w-full max-w-md space-y-6 p-6">
          <Header />
          <ConvertCard targetExtension={conversionParams.target} />
          <Processing />
          <ConvertSettings {...conversionParams} />
        </div>
      </div>
      <ByMshfr />
      <GridBackground />
      <Toaster richColors position={"top-center"} closeButton />
    </FfmpegProvider>
  );
}
