import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, X, ImagePlus } from "lucide-react";
import DatePicker from "@hassanmojab/react-modern-calendar-datepicker";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

import {
  addProfileImage,
  updateUserProfile,
} from "../../core/services/api/user";
import useFilePreview from "../../hooks/use-file-preview";
import { cn } from "../../../libs/utils";

import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import "./index.css";
import { SelectInput } from "../../components/select-input";

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

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z.object({
  firstName: z.string().min(1, { message: "نام الزامیست" }),
  lastName: z.string().min(1, { message: "فامیلی الزامیست" }),
  nationalId: z.string().min(10, { message: "کد ملی باید 10 رقمی باشد" }),
  biography: z.string().min(10, "این فیلد باید بیشتر از 10 کلمه باشد"),
  linkedinProfile: z.string().min(20, "حساب خود را درست وارد کنید"),
  telegramLink: z.string().min(19, "حساب خود را درست وارد کنید"),
  homeAddress: z.string().min(10, "آدرس باید بیشتر از 10 حرف باشد"),
  gender: z.string().refine((data) => data === "true" || "false", {
    message: "جنسیت را مشخص کنید",
  }),
  image: z
    .any()
    .refine(
      (files) => files?.length == 1 || files?.name,
      "ابتدا یک عکس انتخاب کنید"
    )
    .refine(
      (files) => (files?.[0]?.size || files?.size) <= MAX_FILE_SIZE,
      `حجم عکس باید کمتر از 5 مگابایت باشد`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type || files?.type),
      "فرمت عکس باید (.jpg, .jpeg, .png و .webp) باشد"
    ),
});

const genderOptions = [
  {
    value: true,
    label: "مرد",
  },
  {
    value: false,
    label: "زن",
  },
];

export const EditProfile = () => {
  const [user, refetch] = useOutletContext();

  const bDate = new Date(user?.birthDay)
    .toLocaleDateString("fa-IR-u-nu-latn")
    .split("/");
  const [selectedDay, setSelectedDay] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [url, setUrl] = useState(function () {
    if (user?.currentPictureAddress === "Not-set") return "";
    const blob = new Blob([user?.currentPictureAddress], {
      type: `image/${user?.currentPictureAddress.substring(
        user?.currentPictureAddress.lastIndexOf(".") + 1,
        user?.currentPictureAddress.length
      )}`,
    });
    const file = new File([blob], user?.currentPictureAddress, {
      type: blob.type,
    });

    return file;
  });

  const date = selectedDay || {
    day: parseInt(bDate?.[2]),
    month: parseInt(bDate?.[1]),
    year: parseInt(bDate?.[0]),
  };
  const [year, month, day] = new Date()
    .toLocaleDateString("fa-IR-u-nu-latn")
    .split("/");
  const maximumDate = { day, month, year };

  const form = useForm({
    defaultValues: {
      firstName: user?.fName,
      lastName: user?.lName,
      nationalId: user?.nationalCode,
      homeAddress: user?.homeAdderess,
      linkdinProfile: user?.linkdinProfile,
      telegramLink: user?.telegramLink,
      biography: user?.userAbout,
      recieveMessage: user?.receiveMessageEvent,
      gender: user?.gender,
      longitude: user?.longitude,
      latitude: user?.latitude,
      image: url,
    },
    resolver: zodResolver(formSchema),
  });

  const [file] = form.watch(["image"]);
  useFilePreview(file, setIsUploading, url, setUrl, setIsPending);
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values) => {
    try {
      if (isPending) return;
      const birthDate = new Date(
        `${selectedDay.year}-${selectedDay.month}-${selectedDay.day}`
      );
      const obj = {
        LName: values.lastName,
        FName: values.firstName,
        UserAbout: values.biography,
        LinkdinProfile: values.linkedInProfile,
        TelegramLink: values.telegramLink,
        ReceiveMessageEvent: values.recieveMessage,
        HomeAdderess: values.address,
        NationalCode: values.nationalId,
        Gender: values.gender,
        BirthDay: birthDate,
        Latitude: values.latitude,
        Longitude: values.longitude,
      };
      await updateUserProfile(obj).then((res) => {
        if (res.success) toast.success("پروفایل بروزرسانی شد");
        else toast.error("مشکلی پیش آمده بعداٌ تلاش کنید");
      });
    } catch (error) {
      console.log("CREATE_COURSE_ERROR]", error);
      toast.error("مشکلی پیش آمده بعداٌ تلاش کنید");
    }
  };

  const handleRemove = () => {
    setIsUploading(true);
    setTimeout(() => {
      form.setValue("image", {});
      setUrl("");
      setIsUploading(false);
    }, 500);
  };

  const handleUpload = async () => {
    try {
      const url = file[0] || file;
      setIsUploading(true);
      setIsPending(true);
      console.log(url);
      await addProfileImage(url).then((res) => {
        if (res.success) {
          refetch();
          toast.success("عکس با موفقیت آپلود شد");
        }
      });
    } catch (error) {
      console.log(error);
      toast.error("مشکلی پیش آمده بعداٌ تلاش کنید");
    } finally {
      setIsUploading(false);
      setIsPending(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto h-full flex items-center justify-center">
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full border-2 border-gray-200 dark:border-gray-500 rounded-xl shadow-sm py-4"
        >
          <div className="grid grid-cols-2 w-full h-full">
            <div className="w-full flex flex-col justify-start items-center gap-y-4">
              <div className="w-full flex flex-col justify-center items-center">
                <div className="w-full flex flex-col justify-center items-center gap-y-2">
                  <label
                    htmlFor="firstName"
                    className="mr-32 text-lg dark:text-gray-400 self-start"
                  >
                    نام
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="نام خود را وارد کنید"
                    className="disabled:cursor-not-allowed outline-none w-full max-w-[300px] bg-gray-100 dark:bg-gray-300 text-gray-500 dark:text-gray-800 border-2 rounded-full px-5 py-3 duration-200 border-gray-300 focus:border-gray-400"
                    {...form.register("firstName")}
                  />
                </div>
                <p
                  className={cn(
                    "opacity-0 text-destructive dark:text-dark-destructive",
                    form.formState.errors?.firstName && "opacity-100"
                  )}
                >
                  {form.formState.errors?.firstName
                    ? form.formState.errors.firstName.message
                    : "ss"}
                </p>
              </div>
              <div className="w-full flex flex-col justify-center items-center">
                <div className="w-full flex flex-col justify-center items-center gap-y-2">
                  <label
                    htmlFor="homeAddress"
                    className="mr-32 text-lg dark:text-gray-400 self-start"
                  >
                    آدرس
                  </label>
                  <input
                    id="homeAddress"
                    name="homeAddress"
                    type="text"
                    placeholder="نام خود را وارد کنید"
                    className="disabled:cursor-not-allowed outline-none w-full max-w-[300px] bg-gray-100 dark:bg-gray-300 text-gray-500 dark:text-gray-800 border-2 rounded-full px-5 py-3 duration-200 border-gray-300 focus:border-gray-400"
                    {...form.register("homeAddress")}
                  />
                </div>
                <p
                  className={cn(
                    "opacity-0 text-destructive dark:text-dark-destructive",
                    form.formState.errors?.homeAddress && "opacity-100"
                  )}
                >
                  {form.formState.errors?.homeAddress
                    ? form.formState.errors.homeAddress.message
                    : "ss"}
                </p>
              </div>
            </div>
            <div className="w-full flex flex-col justify-start items-center gap-y-4 mx-2">
              <div className="w-full flex flex-col justify-center items-center">
                <div className="w-full flex flex-col justify-center items-center gap-y-2">
                  <label
                    htmlFor="lastName"
                    className="mr-32 text-lg dark:text-gray-400 self-start"
                  >
                    فامیلی
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="نام خود را وارد کنید"
                    className="disabled:cursor-not-allowed outline-none w-full max-w-[300px] bg-gray-100 dark:bg-gray-300 text-gray-500 dark:text-gray-800 border-2 rounded-full px-5 py-3 duration-200 border-gray-300 focus:border-gray-400"
                    {...form.register("lastName")}
                  />
                </div>
                <p
                  className={cn(
                    "opacity-0 text-destructive dark:text-dark-destructive",
                    form.formState.errors?.lastName && "opacity-100"
                  )}
                >
                  {form.formState.errors?.lastName
                    ? form.formState.errors.lastName.message
                    : "ss"}
                </p>
              </div>
              <div className="w-full flex justify-center items-center">
                <div className="w-full flex flex-col justify-center items-center gap-y-2">
                  <label
                    htmlFor="recieveMessage"
                    className="mr-32 text-lg dark:text-gray-400 self-start"
                  >
                    تاریخ تولد
                  </label>
                  <DatePicker
                    value={date}
                    onChange={setSelectedDay}
                    inputPlaceholder="روز تولد..."
                    maximumDate={maximumDate}
                    colorPrimary="#5c55c4"
                    inputClassName="w-[300px] text-start disabled:cursor-not-allowed outline-none text-[15px] bg-gray-100 dark:bg-gray-300 text-gray-500 dark:text-gray-800 border-2 rounded-full px-5 py-3 duration-200 border-gray-300 focus:border-gray-400"
                    shouldHighlightWeekends
                    locale="fa"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center w-full px-20 ">
            <div className="w-1/2 flex flex-col justify-center items-center">
              <div className="w-full flex flex-col justify-center items-center gap-y-2">
                <label
                  htmlFor="biography"
                  className="mr-8 text-lg dark:text-gray-400 self-start"
                >
                  درباره من
                </label>
                <textarea
                  className={cn(
                    "resize-none w-full h-40 disabled:cursor-not-allowed outline-none bg-gray-100 dark:bg-gray-300 text-gray-500 dark:placeholder:text-gray-600 dark:text-gray-800 border-2 rounded-xl px-6 pl-12 py-3 duration-200 border-gray-300 focus:border-gray-400",
                    form.formState.errors?.biography &&
                      "border-destructive dark:border-dark-destructive focus:border-destructive dark:focus:border-dark-destructive"
                  )}
                  placeholder="درباره من"
                  {...form.register("biography")}
                />
              </div>
              <p
                className={cn(
                  "opacity-0 text-destructive dark:text-dark-destructive",
                  form.formState.errors?.biography && "opacity-100"
                )}
              >
                {form.formState.errors?.biography
                  ? form.formState.errors.biography.message
                  : "ss"}
              </p>
            </div>
            {isUploading ? (
              <Loader2
                size={40}
                className="text-gray-500 dark:text-gray-300 animate-spin"
              />
            ) : (
              <>
                <div className="flex flex-col items-center justify-center my-10">
                  <label htmlFor="image">
                    {url ? (
                      <>
                        <X
                          onClick={handleRemove}
                          className="w-6 h-6 text-destructive/80 hover:text-destructive transition cursor-pointer self-start"
                        />
                        <motion.div
                          variants={backdrop}
                          initial="hidden"
                          animate="start"
                          exit="exit"
                          className="img-wrap img-upload w-[150px] h-[150px] custom-file-upload fas"
                        >
                          <img
                            htmlFor="image"
                            src={url.name || url}
                            className="w-full h-full rounded-full object-cover"
                          />{" "}
                        </motion.div>
                      </>
                    ) : (
                      <div className="group flex flex-col justify-center items-center gap-y-2 cursor-pointer">
                        <ImagePlus className="w-16 h-16 text-primary group-hover:text-primary/80 transition" />
                        <p className="text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-300/80 transition">
                          اضافه کردن تصویر
                        </p>
                      </div>
                    )}
                    <input
                      id="image"
                      name="image"
                      type="file"
                      {...form.register("image")}
                    />
                  </label>

                  <button
                    onClick={handleUpload}
                    type="button"
                    disabled={
                      isUploading || !url || url === user?.currentPictureAddress
                    }
                    className="my-4 text-gray-200 disabled:text-gray-300 bg-primary dark:bg-dark-primary py-2 px-4 rounded-xl disabled:bg-primary/80 dark:disabled:bg-dark-primary/80 disabled:cursor-not-allowed"
                  >
                    آپلود عکس
                  </button>
                </div>
                {form.formState.errors?.image && (
                  <p className="text-destructive">
                    {form.formState.errors.image.message}
                  </p>
                )}
              </>
            )}
          </div>
          <div className="flex items-center justify-center my-4">
            <button
              disabled={isSubmitting || !isValid || isPending}
              type="submit"
              className=" bg-primary dark:bg-dark-primary text-gray-100 dark:text-gray-200 hover:bg-primary/70 dark:hover:bg-dark-primary/70 hover:text-white/90 dark:hover:text-gray-200/90 disabled:bg-primary/70 disabled:text-white/90 dark:disabled:bg-dark-primary/70 dark:disabled:text-gray-200/90 disabled:cursor-not-allowed font-thin px-10 py-2 rounded-xl text-lg transition"
            >
              ذخیره
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
