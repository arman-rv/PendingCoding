// import location from '../assets/location.svg'
import { Banner } from "../components/banner";
import { ContactItems } from "./contact_items";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import loc from "../assets/contact_us_items/loc.svg";
import phone from "../assets/contact_us_items/phone.svg";
import email from "../assets/contact_us_items/email.svg";
import instagram from "../assets/contact_us_items/instagram.svg";
import telegram from "../assets/contact_us_items/telegram.svg";
import face from "../assets/contact_us_items/face.svg";
import x from "../assets/contact_us_items/x.svg";

import Amir from "../assets/amir.jpg";
import Arman from "../assets/arman.jpg";
import { getPersianNumbers } from "../../libs/get-persian-numbers";
import { Map } from "./map";

const formSchema = z.object({
  email: z
    .string()
    .email({ message: "ایمیل نامعتبر" })
    .min(1, { message: "ایمیل خود را وارد کنید" }),
  message: z.string().min(1, { message: "پیام خود را وارد کنید" }),
});

const ContactUs = () => {
  const form = useForm({
    defaultValues: {
      email: "",
      message: "",
    },
    resolver: zodResolver(formSchema),
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values) => {
    console.log(values);
  };

  return (
    <div className="w-[clamp(100px,100%,1596px)] m-[0_auto] flex flex-col p-[0_50px_150px] pt-20">
      <Banner title="ارتباط با ما" />

      <div
        className="flex m-[80px_0] gap-[20px]
      
      max-[1500px]:flex-col max-[1500px]:items-center max-[1500px]:gap-[60px]"
      >
        <div className="w-[clamp(100px,100%,550px)] h-[426px]">
          <div
            className="h-[44px] flex mb-[80px]
          
          max-[1500px]:justify-center max-[1500px]:pl-[60px]"
          >
            <img src={loc} />
            <div className="flex flex-col m-[0_10px_0_0]">
              <p
                className="text-[#505050] text-[15px]  transition
            dark:text-gray-400"
              >
                {" "}
                آدرس پزوهشگاه :{" "}
              </p>
              <p
                className="text-[#A4A4A4] text-[14px]  transition
            dark:text-gray-200"
              >
                میدان خزر،نرسیده به دانشگاه روزبهان،جنب دنیای آرزو
              </p>
            </div>
          </div>

          <div
            className="flex flex-row
          
          max-[1500px]:justify-center"
          >
            <div className="w-[clamp(50px,100%,285px)]">
              <ContactItems
                src={phone}
                title="شماره تلفن :"
                desc={`${getPersianNumbers(989117828923, true)}+`}
              />
              <ContactItems
                src={instagram}
                title="اینستاگرام :"
                desc="__arman__rv"
              />
              <ContactItems
                src={face}
                title="فیس بوک :"
                desc="نتیجه ای یافت نشد!"
              />
            </div>
            <div className="w-[clamp(50px,100%,255px)]">
              <ContactItems
                src={email}
                title="پست الکترونیکی :"
                desc="pendingcoding@gmail.com"
              />
              <ContactItems src={telegram} title="تلگرام :" desc="arman_rv@" />
              <ContactItems src={x} title="توییتر" desc="نتیجه ای یافت نشد!" />
            </div>
          </div>
        </div>

        <div
          className="w-[clamp(100px,100%,1000px)] border-[13px] border-transparent rounded-[20px] overflow-hidden shadow-[0_0_0_4px_#5c55c9] h-[460px]
        max-[1500px]:h-[360px] max-[1500px]:w-[clamp(100px,100%,940px)]"
        >
          {/* <img src={location} className="w-full" /> */}
          <div className="w-full h-full rounded-[13px] overflow-hidden">
            <Map />
          </div>
        </div>
      </div>

      <div
        className="flex gap-[150px]
      
      max-[1100px]:gap-[10px]
      max-[960px]:flex-col max-[960px]:gap-[30px] max-[960px]:items-center max-[960px]:px-[50px]"
      >
        <div
          className="w-[clamp(100px,90%,704px)] flex flex-col
        
        max-[960px]:w-[100%]"
        >
          <Banner title="با ما در تماس باشید " />

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-start justify-start gap-y-2 mt-[45px]
            
            max-[960px]:w-full max-[960px]:items-center"
          >
            <input
              className="disabled:cursor-not-allowed outline-none w-[clamp(100px,90%,704px)] bg-transparent text-gray-500 border-2 rounded-full px-6 pl-12 py-4 duration-200 border-gray-300 focus:border-gray-400 mb-[15px]
              dark:bg-transparent dark:border-gray-400 dark:text-gray-300 dark:placeholder-gray-300"
              placeholder="پست الکترونیکی"
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <p className="text-rose-600/90 mr-5 text-base">
                {form.formState.errors.email.message}
              </p>
            )}
            <textarea
              className="resize-none h-40 disabled:cursor-not-allowed outline-none w-[clamp(100px,90%,704px)] bg-transparent text-gray-500 border-2 rounded-[25px] px-6 pl-12 py-3 duration-200 border-gray-300 focus:border-gray-400 transition
              dark:bg-transparent dark:border-gray-400 dark:text-gray-300 dark:placeholder-gray-300"
              placeholder="متن پیام"
              {...form.register("message")}
            />
            {form.formState.errors.message && (
              <p className="text-rose-600/90 mr-5 text-base">
                {form.formState.errors.message.message}
              </p>
            )}
            <button
              type="submit"
              disabled={isSubmitting || !isValid}
              className="text-white hover:text-white/80 bg-primary hover:bg-primary/80 disabled:bg-primary/80 disabled:text-white/80 py-2 text-lg w-2/4 my-4  rounded-full transition
              dark:disabled:bg-dark-primary dark:hover:bg-dark-primary/100 dark:bg-primary/90 "
            >
              ارسال پیام
            </button>
          </form>
        </div>

        <div
          className="flex flex-col gap-[45px]
        
        max-[960px]:w-[100%]"
        >
          <Banner title="اعضای تیم" />

          <div className="flex flex-col gap-[80px]">
            <div className="flex gap-[20px]">
              <img
                className="w-32 h-32 rounded-full object-cover"
                src={Amir}
                alt="AmirPic"
              />

              <div className="flex flex-col gap-[10px] text-[#505050] dark:text-gray-400">
                <p className="text-[18px] text-[#A4A4A4] dark:text-gray-200 transition">
                  امیرعباس بابایی
                </p>
                <p className="text-[14px]  transition">کارشناس پشتیبانی فنی</p>
                <p className="text-[14px]  transition">
                  شماره موبایل: 90203693966
                </p>
                <p className="text-[14px]  transition">
                  پست الکترونیکی : pendingcoding@gmail.com
                </p>
              </div>
            </div>
            <div className="flex gap-[20px]">
              <img
                className="w-32 h-32 rounded-full object-cover"
                src={Arman}
                alt="ArmanPic"
              />
              <div className="flex flex-col gap-[10px] text-[#505050] dark:text-gray-400 ">
                <p className="text-[18px] text-[#A4A4A4] dark:text-gray-200">
                  آرمان رضوانی
                </p>
                <p className="text-[14px]">کارشناس پشتیبانی فنی</p>
                <p className="text-[14px]">شماره موبایل: 90203693966</p>
                <p className="text-[14px]">
                  پست الکترونیکی : pendingcoding@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ContactUs };
