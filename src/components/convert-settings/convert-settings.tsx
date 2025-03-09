import { allowedExtensions } from "@/lib/hooks/ffmpeg/allowed-extensions";
import { schema } from "@/lib/schema/conversion-types";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useNavigate } from "@tanstack/react-router";

type ConversionParams = z.infer<typeof schema.conversionParams>;

export default function ConvertSettings(props: ConversionParams) {
  const { source, target } = props;
  const navigate = useNavigate();

  const getAvailableExtensions = (
    extensionType: keyof typeof allowedExtensions
  ) => {
    return allowedExtensions[extensionType];
  };

  const handleSourceChange = (value: string) => {
    navigate({ to: ".", search: { source: value, target } });
  };

  const handleTargetChange = (value: string) => {
    navigate({ to: ".", search: { source, target: value } });
  };

  // Helper function to determine media type from file extension
  const getMediaTypeFromExtension = (
    extension: string
  ): keyof typeof allowedExtensions => {
    // Remove the dot if it exists at the beginning
    const ext = extension.startsWith(".") ? extension : `.${extension}`;
    console.log(extension);

    // Check which category contains this extension
    if (allowedExtensions.video.includes(ext)) return "video";
    if (allowedExtensions.audio.includes(ext)) return "audio";
    if (allowedExtensions.image.includes(ext)) return "image";

    // Default to image if extension not found
    return "image";
  };

  // Use the file extension to determine the media type
  const currentExtensionType = source
    ? getMediaTypeFromExtension(source)
    : "image";

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>conversion settings</CardTitle>
        <CardDescription>waiting for file</CardDescription>
      </CardHeader>
      <CardContent className="text-sm">
        <div className="flex items-center gap-3">
          <Select onValueChange={handleSourceChange} value={source}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="source format" />
            </SelectTrigger>
            <SelectContent>
              {getAvailableExtensions(currentExtensionType).map((e) => (
                <SelectItem key={e} value={e}>
                  {e}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p>to</p>
          <Select onValueChange={handleTargetChange} value={target}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="target format" />
            </SelectTrigger>
            <SelectContent>
              {getAvailableExtensions(currentExtensionType).map((e) => (
                <SelectItem key={e} value={e}>
                  {e}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
