import { Loader2 } from "lucide-react";

export const Loading = () => {
  return (
    <div className="flex flex-col gap-3 items-center justify-center my-52 bg-transparent">
      <Loader2 className="w-12 h-12 text-gray-600/90 dark:text-gray-300 animate-spin" />
      <p className="text-zinc dark:text-gray-300 text-xl">لطفاٌ صبر کنید</p>
    </div>
  );
};
