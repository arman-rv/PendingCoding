import { useState } from "react";
import { ImagePlus, X } from "lucide-react";
import { motion } from "framer-motion";

const backdrop = {
  hidden: {
    opacity: 0,
  },
  start: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
  exit: {
    opacity: 0,
  },
};

const ImgUpload = ({ onChange, src }) => {
  return (
    <>
      <label htmlFor="photo-upload">
        {src ? (
          <motion.div
            variants={backdrop}
            initial="hidden"
            animate="start"
            exit="exit"
            className="img-wrap img-upload w-[200px] h-[200px] custom-file-upload fas"
          >
            <img
              htmlFor="photo-upload"
              src={src}
              className="w-full h-full rounded-full object-cover"
            />
          </motion.div>
        ) : (
          <div className="group flex flex-col justify-center items-center gap-y-2 cursor-pointer">
            <ImagePlus className="w-16 h-16 text-primary group-hover:text-primary/80 transition" />
            <p className="text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-300/80 transition">
              اضافه کردن تصویر
            </p>
          </div>
        )}
        <input id="photo-upload" type="file" onChange={onChange} />
      </label>
    </>
  );
};

const CardProfile = () => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  const photoUpload = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {imagePreviewUrl && (
        <div onClick={() => setImagePreviewUrl(null)} className="self-start">
          <X className="w-7 h-7 self-start justify-self-start text-rose-700 cursor-pointer" />
        </div>
      )}
      <ImgUpload onChange={photoUpload} src={imagePreviewUrl} />
    </div>
  );
};

export { CardProfile };
