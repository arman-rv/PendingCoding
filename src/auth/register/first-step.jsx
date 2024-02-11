import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "../../../libs/utils";
import { VerifyCode } from "./first-step-verify";
import { useState } from "react";
import { sendVerifyMessage } from "../../core/services/api/auth";
import toast from "react-hot-toast";
import { TestCaptcha } from "./test-captcha";

const FirstStep = ({ setStep, setSaveUser, saveUser, step }) => {
  const formSchema = z.object({
    phoneNumber: z
      .string()
      .min(4, { message: "رمز عبور حداقل 4 کاراکتر دارد" })
      .max(15, { message: "رمز عبور حداکثر 15 کاراکتر دارد" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const [timerText, setTimerText] = useState("دریافت کد");

  const [loading, setLoading] = useState(false);

  // const onSubmit = (values) => {
  //   const newObj = [values.phoneNumber];
  //   setUserInfo(...newObj);

  //   setLoading(true);

  //   setTimerText(10);
  //   const interval = setInterval(() => {
  //     setTimerText((prevCounter) => {
  //       if (prevCounter <= 1) {
  //         setLoading(false);
  //         clearInterval(interval);
  //         return "دریافت مجدد";
  //       } else {
  //         return prevCounter - 1;
  //       }
  //     });
  //   }, 1000);

  //   console.log(newObj , timerText)
  // };

  const onSubmit = async (values) => {
    setSaveUser({ phoneNumber: values.phoneNumber });

    const sendVerifyMessageAPI = await sendVerifyMessage(values);

    setLoading(true);

    setTimerText(10);
    const interval = setInterval(() => {
      setTimerText((prevCounter) => {
        if (prevCounter <= 1) {
          setLoading(false);
          clearInterval(interval);
          return "دریافت مجدد";
        } else {
          return prevCounter - 1;
        }
      });
    }, 1000);

    console.log(sendVerifyMessageAPI);

    if (sendVerifyMessageAPI.success === false) {
      toast.error(sendVerifyMessageAPI.message);
    } else if (sendVerifyMessageAPI.message === "درخواست نامعتبر") {
      toast.error(sendVerifyMessageAPI.message);
    } else {
      toast.success(sendVerifyMessageAPI.message);
    }
  };

  return (
    <div className={cn(`block mt-[10px]`, step === 2 && `hidden`)}>
      <form
        className="w-[100%] flex flex-col relative"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          value={saveUser.phoneNumber}
          onChange={(e) => {
            const obj = { ...saveUser, phoneNumber: e.target.value };
            setSaveUser(obj);
            console.log(obj, saveUser);
          }}
          placeholder="شماره موبایل"
          className={cn(
            `focus:outline-none focus:border-[#989898] block pr-[14px] bg-transparent w-[100%] h-[55px] border-[1px] border-solid border-[#C8C8C8] text-[#666] rounded-[50px] text-[20px]
                  dark:border-[rgb(181,188,200)] dark:placeholder-[rgb(181,188,200)] dark:focus:border-gray-50 dark:text-white
                  
                max-[700px]:max-[700px]:h-[50px] max-[700px]:text-[18px]`,
            errors.phoneNumber &&
              `border-[#ff3b3b] text-[#ff3b3b] placeholder-[#ff3434] focus:border-[#ff3b3b]
                  dark:border-red-500 dark:placeholder-red-500 dark:text-red-500 dark:focus:border-red-500`
          )}
          {...register("phoneNumber")}
        />

        {/* {errors.phoneNumber && ()} */}
        <div
          className="text-[#ff1f1f] p-[2.5px_13px_0_0]
                  dark:text-red-500 h-[33px] 
                  
              max-[700px]:text-[13px]"
        >
          {errors.phoneNumber?.message}
        </div>

        <button
          disabled={loading}
          className="
            bg-[#505050] cursor-pointer rounded-[50px] text-[17px] text-white w-[33%] p-[10px_0] transition hover:bg-[#626262] absolute top-[92px] left-[0] h-[55px]
                dark:bg-gray-600 dark:hover:bg-[rgb(87,98,115)]
                disabled:cursor-default disabled:hover:bg-[#505050] disabled:text-[20px] 
                 
                max-[700px]:p-[7px_0]"
          type="submit"
        >
          {timerText}
        </button>
      </form>

      <VerifyCode setStep={setStep} saveUser={saveUser} />

      {/* <Captcha /> */}

      <TestCaptcha />
    </div>
  );
};

export { FirstStep };
