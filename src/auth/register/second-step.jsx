import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "../../../libs/utils";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { loginAPI, registerAPI } from "../../core/services/api/auth";
import { useState } from "react";
// import { useUser } from "../../hooks/use-user";

const SecondStep = ({ setStep, saveUser , step }) => {
  const formSchema = z
    .object({
      email: z
        .string()
        .email({ message: "ایمیل نامعتبر" })
        .min(1, { message: "ایمیل خود را وارد کنید" }),
      password: z
        .string()
        .min(4, { message: "رمز عبور حداقل 4 کاراکتر دارد" })
        .max(15, { message: "رمز عبور حداکثر 15 کاراکتر دارد" }),
      confirmPassword: z
        .string()
        .min(4, { message: "رمز عبور حداقل 4 کاراکتر دارد" })
        .max(15, { message: "رمز عبور حداکثر 15 کاراکتر دارد" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "باید با رمز عبور یکسان باشد",
      path: ["confirmPassword"],
    });

  const [isCheck, setIsCheck] = useState(false);
  const handleCheckBox = () => {
    setIsCheck(!isCheck);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  // const { userData, setUserData } = useUser();
  const navigate = useNavigate();

  //   const onSubmit = (values) => {
  //     const newObj = {
  //       ...userData,
  //       user: { ...userInfo, email: values.email, password: values.password },
  //     };
  //     localStorage.setItem("user", JSON.stringify(newObj));
  //     toast.success("با موافقیت وارد شدید");
  //     setTimeout(() => {
  //       navigate("/");
  //       setUserData(newObj);
  //     }, 500);

  //     console.log(newObj);
  //   };

  // const handleBack = () => {
  //   setStep((cs) => cs - 1);
  // };

  const onSubmit = async (values) => {
    const newObj = {
      phoneNumber: saveUser.phoneNumber,
      password: values.password,
      gmail: values.email,
    };

    localStorage.setItem("user", JSON.stringify(newObj));

    const lastStepRegisterAPI = await registerAPI(newObj);

    // call login api
    const obj = {
      password: values.password,
      phoneOrGmail: values.email,
      rememberMe: true,
    };
    const loginApi = await loginAPI(obj);

    toast.success("با موافقیت وارد شدید");

    setTimeout(() => {
      navigate("/");
    }, 700);

    console.log(lastStepRegisterAPI, loginApi);
  };

  const handleBack = () => {
    setStep((cs) => cs - 1);
  };

  return (
    <>
      <form
        className={cn(`hidden` , 
        step === 2 && `w-[100%] flex flex-col`)}
        onSubmit={handleSubmit(onSubmit)}
      >
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
          className="text-[#ff1f1f] right-[10px] p-[2.5px_13px_0_0]
                  dark:text-red-500 h-[33px] 
                  
              max-[700px]:text-[13px]"
        >
          {errors.email?.message}
        </div>

        <input
          type="password"
          placeholder="رمز عبور"
          className={cn(
            `focus:outline-none focus:border-[#989898] block pr-[14px] bg-transparent w-[100%] h-[55px] border-[1px] border-solid border-[#C8C8C8] text-[#666] rounded-[50px] text-[20px]
                  dark:border-[rgb(181,188,200)] dark:placeholder-[rgb(181,188,200)] dark:focus:border-gray-50 dark:text-white
                  
                max-[700px]:max-[700px]:h-[50px] max-[700px]:text-[18px]`,
            errors.password &&
              `border-[#ff3b3b] text-[#ff3b3b] placeholder-[#ff3434] focus:border-[#ff3b3b]
                  dark:border-red-500 dark:placeholder-red-500 dark:text-red-500 dark:focus:border-red-500`
          )}
          {...register("password")}
        />
        <div
          className="text-[#ff1f1f] right-[10px] p-[2.5px_13px_0_0]
                  dark:text-red-500 h-[33px] 
                  
              max-[700px]:text-[13px]"
        >
          {errors.password?.message}
        </div>

        <input
          type="password"
          placeholder="تکرار رمز عبور"
          className={cn(
            `focus:outline-none focus:border-[#989898] block pr-[14px] bg-transparent w-[100%] h-[55px] border-[1px] border-solid border-[#C8C8C8] text-[#666] rounded-[50px] text-[20px]
                  dark:border-[rgb(181,188,200)] dark:placeholder-[rgb(181,188,200)] dark:focus:border-gray-50 dark:text-white
                  
                max-[700px]:max-[700px]:h-[50px] max-[700px]:text-[18px]`,
            errors.confirmPassword &&
              `border-[#ff3b3b] text-[#ff3b3b] placeholder-[#ff3434] focus:border-[#ff3b3b]
                  dark:border-red-500 dark:placeholder-red-500 dark:text-red-500 dark:focus:border-red-500`
          )}
          {...register("confirmPassword")}
        />
        <div
          className="text-[#ff1f1f] right-[10px] p-[2.5px_13px_0_0]
                  dark:text-red-500 h-[33px] 
                  
              max-[700px]:text-[13px]"
        >
          {errors.confirmPassword?.message}
        </div>

        <div
          className="flex gap-[10px] m-[0_0_20px] items-center text-[#969696]
                dark:text-gray-200 mt-[5px]
                      
                      max-[700px]:m-[0_0_13px]"
        >
          <input
            type="checkbox"
            name="term"
            id="term"
            className="absolute invisible peer"
            checked={isCheck}
            onChange={handleCheckBox}
          />

          <label
            htmlFor="term"
            className="w-[24px] h-[24px] bg-white shadow-[0_1px_10px_rgba(0,0,0,0.25)] rounded-[7px] peer-checked:shadow-[0_1px_10px_rgba(92,85,201,0.25)] peer-checked:bg-[url('../../public/img/check.svg')] bg-no-repeat bg-[length:75%] bg-[50%] cursor-pointer
                          
                max-[700px]:w-[20px] max-[700px]:h-[20px]"
          >
            {" "}
          </label>

          <label htmlFor="term" className="text-[12px] cursor-pointer">
            {" "}
            با{" "}
            <Link to="/terms-and-conditions" className="text-[#02B2B8]">
              قوانین و مقررات{" "}
            </Link>
            درج شده در آکادمی موافقم.{" "}
          </label>
        </div>

        <button
          disabled={isCheck === false}
          className="
                bg-[#505050] cursor-pointer rounded-[50px] text-[18px] text-white w-[100%] p-[10px_0] transition hover:bg-[#626262]
                disabled:bg-[#5e5e5e] disabled:cursor-no-drop
                dark:bg-gray-600 dark:hover:bg-[rgb(87,98,115)]
                dark:disabled:bg-[rgb(67,76,91)]
                 
                max-[700px]:p-[7px_0]"
          type="submit"
        >
          {" "}
          ثبت نام{" "}
        </button>

        <button
          onClick={handleBack}
          className="cursor-pointer rounded-[50px] text-[18px] text-[#505050] p-[10px] m-[10px_auto]
                dark:text-gray-300
              
              max-[700px]:p-[7px_0]"
        >
          {" "}
          مرحله قبل{" "}
        </button>
      </form>
    </>
  );
};

export { SecondStep };
