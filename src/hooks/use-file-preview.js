import { useEffect } from "react";

export default function useFilePreview(
  file,
  setIsLoading,
  url,
  setUrl,
  setIsPending
) {
  useEffect(() => {
    setIsLoading(true);
    if (file && file[0]) {
      let currentProfile;
      if (file?.[0].name) currentProfile = false;
      else {
        currentProfile = file?.name.includes(
          "https://acadapi.etacorealtime.ir"
        );
      }
      if (!currentProfile) {
        const newUrl = URL.createObjectURL(file[0]);
        if (newUrl !== url) {
          setUrl(newUrl);
          setIsPending(true);
        }
      }
    }
    setIsLoading(false);
  }, [file]);

  return null;
}
