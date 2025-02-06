import { Button } from "../ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function ConvertCard() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>convert files</CardTitle>
        <CardDescription>
          drag and drop, click, or paste to convert locally
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-end">
        <Button size="sm" className="font-bold" disabled>
          convert anything
        </Button>
      </CardFooter>
    </Card>
  );
}
