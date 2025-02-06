import { schema } from "@/lib/schema/conversion-types";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { allowedExtensions } from "@/lib/hooks/ffmpeg/allowed-extensions";

type ConversionParams = z.infer<typeof schema.conversionParams>;

export default function ConvertSettings(props: ConversionParams) {
  const { source, target } = props;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>conversion settings</CardTitle>
        <CardDescription>waiting for file</CardDescription>
      </CardHeader>
      <CardContent className="text-sm">
        <div className="flex items-center gap-3">
          <Select>
            <SelectTrigger className="w-[180px]" />
            <SelectContent>
              {allowedExtensions.video.map((e) => (
                <SelectItem key={e} value={e}>
                  {e}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p>to</p>
          <Select>
            <SelectTrigger className="w-[180px]" />
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
