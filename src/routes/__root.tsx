import { ByMshfr } from "@/components/by-mshfr";
import ConvertCard from "@/components/convert";
import ConvertSettings from "@/components/convert-settings/convert-settings";
import { Header } from "@/components/header";
import { GridBackground } from "@/components/ui/grid-background";
import { useFfmpeg } from "@/lib/hooks/ffmpeg/useFfmpeg";
import { schema } from "@/lib/schema/conversion-types";
import { createRootRoute, stripSearchParams } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { Toaster } from "@/components/ui/sonner";

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
  const { loaded, handleTranscode, processing } = useFfmpeg();

  return (
    <>
      <div className="w-full min-h-screen flex flex-col gap-6 items-center justify-center relative">
        <div className="w-full max-w-md space-y-6 p-6">
          <Header loaded={loaded} />
          <ConvertCard
            handleTranscode={handleTranscode}
            targetExtension={conversionParams.target}
            loading={processing}
          />
          <ConvertSettings {...conversionParams} />
        </div>
      </div>
      <ByMshfr />
      <GridBackground />
      <Toaster richColors position={"top-center"} closeButton />
    </>
  );
}
