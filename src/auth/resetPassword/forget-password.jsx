import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "../../../libs/utils";
import toast from "react-hot-toast";
import { forgetPasswordAPI } from "../../core/services/api/auth";

const ForgetPassword = () => {
  const formSchema = z.object({
    email: z
      .string()
      .email({ message: "ایمیل نامعتبر" })
      .min(1, { message: "ایمیل خود را وارد کنید" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values) => {
    const obj = {
      email: values.email,
      baseUrl: "http://localhost:5173/resetPassword",
    };
    const forgetPassword = await forgetPasswordAPI(obj);
    console.log(forgetPassword);
    if (forgetPassword.success === true) {
      toast.success("ایمیل تایید برای شما ارسال شد");
    } else {
      toast.error(forgetPassword.errors);
    }
  };

  return (
    <div
      className="bg-[#EEEEEE] w-[700px] h-[700px] rounded-[100%] border-[15px] border-solid border-[#505050] flex justify-center items-center relative transition
      dark:bg-gray-800 dark:border-gray-600
       
      max-[700px]:w-[500px] max-[700px]:h-[500px]"
    >
      <div
        className="w-[350px] h-[460px] flex justify-center items-center flex-col      flex-nowrap
         
         max-[700px]:w-[275px]"
      >
        <h1
          className="text-[#505050] text-[28px] mb-[30px]
          dark:text-gray-300
             
          max-[700px]:mb-[20px] max-[700px]:text-[26px]"
        >
          {" "}
          ارسال ایمیل تایید{" "}
        </h1>

        <h2 className="text-[17px] text-center text-[#454545] mb-[25px]
        dark:text-gray-300"> 
          پست الکترونیکی حساب کاربری خود را وارد کنید تا لینک بازیابی برای آن ارسال شود
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="w-[100%]">
          <input
            type="text"
            placeholder="پست الکترونیکی"
            className={cn(
              `focus:outline-none focus:border-[#989898] block pr-[14px] bg-transparent w-[100%] h-[55px] border-[1px] border-solid border-[#C8C8C8] text-[#666] rounded-[50px] text-[20px]
                  dark:border-[rgb(181,188,200)] dark:placeholder-[rgb(181,188,200)] dark:focus:border-gray-50 dark:text-white
                  
                max-[700px]:max-[700px]:h-[50px] max-[700px]:text-[18px]`,
              errors.email &&
                `border-[#ff3b3b] text-[#ff3b3b] placeholder-[#ff3434] focus:border-[#ff3b3b]
                dark:border-red-500 dark:placeholder-red-500 dark:text-red-500 dark:focus:border-red-500`
            )}
            {...register("email")}
          />

          <div
            className="text-[#ff1f1f] p-[2.5px_13px_0_0]
                  dark:text-red-500 h-[33px] 
                  
              max-[700px]:text-[13px]"
          >
            {errors.email?.message}
          </div>

          <button
            className="
            bg-[#505050] cursor-pointer rounded-[50px] text-[18px] text-white w-[100%] p-[10px_0] transition hover:bg-[#626262]
            disabled:bg-[#5e5e5e] disabled:cursor-no-drop
            dark:bg-gray-600 dark:hover:bg-[rgb(87,98,115)]
            dark:disabled:bg-[rgb(67,76,91)]
                 
            max-[700px]:p-[7px_0]"
            type="submit"
          >
            {" "}
            ارسال ایمیل{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export { ForgetPassword };
