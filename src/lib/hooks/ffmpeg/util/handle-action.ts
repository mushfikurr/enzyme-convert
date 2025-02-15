import { mutations } from "@/lib/db/actions/mutations";
import { toast } from "sonner";

export const handleAction = async <TArgs extends any[], TResult>(
  actionFn: (...args: TArgs) => Promise<TResult>,
  statusUpdateId: number,
  ...args: TArgs
): Promise<TResult | null> => {
  try {
    if (statusUpdateId) {
      await mutations.updateFileRecordStatus(statusUpdateId, "in progress");
    }

    const result = await actionFn(...args);

    if (statusUpdateId) {
      await mutations.updateFileRecordStatus(statusUpdateId, "completed");
    }

    return result;
  } catch (error) {
    if (statusUpdateId) {
      await mutations.updateFileRecordStatus(statusUpdateId, "failed");
    }

    toast.error("Action failed", { description: (error as Error).message });
    console.error(error);
    return null;
  }
};
