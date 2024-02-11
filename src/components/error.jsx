import { ServerCrash } from "lucide-react";

export const Error = () => {
  return (
    <div className="flex flex-col gap-3 items-center justify-center my-52 dark:bg-gray-800">
      <ServerCrash className="w-12 h-12 text-danger/80 text-rose-600" />
      <p className="text-rose-600/80 text-xl">مشکلی پیش آمده بعداٌ تلاش کنید</p>
    </div>
  );
};
