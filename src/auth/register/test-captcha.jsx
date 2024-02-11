import { cn } from "../../../libs/utils";
import { useState } from "react";
import { ValidContext } from "./register";
import { useContext } from "react";
import { useRef } from "react";

import refIMG from "../../assets/refresh.png";
import checkIMG from "../../assets/check.png";
import unCheckIMG from "../../assets/unCheck.png";

const TestCaptcha = () => {
  const { setIsValid } = useContext(ValidContext);

  const randomString = (Math.random() + 1)
    .toString(19)
    .toUpperCase()
    .substring(2, 6);
  const [captcha, setCapthat] = useState(randomString);

  const [check, setCheck] = useState(null);

  const [img, setImg] = useState(null);

  const refreshCaptcha = () => {
    setCapthat((Math.random() + 1).toString(19).toUpperCase().substring(2, 6));
  };

  const ref = useRef();

  const onChange = (e) => {
    clearTimeout(ref.current);
    const timeOut = setTimeout(() => {
      const data = e.target.value;
      const len = data.length;
      if (captcha === data && len === 4) {
        setCheck(true);
        setIsValid(true);
        setImg(true);
      } else if (captcha !== data && len >= 4) {
        setCheck(false);
        setIsValid(false);
        setImg(false);
      } else {
        setCheck(null);
        setImg(null);
        setIsValid(false);
      }
    }, 700);

    ref.current = timeOut;
  };

  return (
    <div className="relative top-[-128px] w-full flex gap-[7px]">
      <form className="w-[100%] flex gap-[5px] relative" onSubmit={onChange}>
        <input
          onChange={onChange}
          type="text"
          placeholder="کپچا را وارد کنید"
          className={cn(
            `focus:outline-none focus:border-[#989898] block pr-[14px] bg-transparent w-[100%] h-[55px] border-[1px] border-solid border-[#C8C8C8] text-[#666] rounded-[50px] text-[20px] mb-[30px]
                  dark:border-[rgb(181,188,200)] dark:placeholder-[rgb(181,188,200)] dark:focus:border-gray-50 dark:text-white
                  
                max-[700px]:mb-[15px] max-[700px]:h-[50px] max-[700px]:text-[18px]`,
            check === true &&
              `border-green-500 text-green-500 placeholder-green-500 focus:border-green-500 
            dark:border-green-600 dark:placeholder-green-600 dark:text-green-600 dark:focus:border-green-600`,
            check === false &&
              `border-[#ff3b3b] text-[#ff3b3b] placeholder-[#ff3434] focus:border-[#ff3b3b]
                  dark:border-red-500 dark:placeholder-red-500 dark:text-red-500 dark:focus:border-red-500`
          )}
        />

        {img === true && (
          <img
            className="w-[27s%] h-[55px] absolute left-1 transition"
            src={checkIMG}
          />
        )}
        {img === false && (
          <img className="w-[26%] h-[55px] absolute left-1" src={unCheckIMG} />
        )}
      </form>

      <div className="min-w-[135px] h-[55px] flex justify-start items-center text-[23px] tracking-[3px] line-through font-bold italic border-[#505050] border-[3px] rounded-[50px] px-[10px] text-[#3d3d3d] flex-row-reverse relative font-serif decoration-double
      
      dark:border-gray-500 dark:text-gray-400">
        {captcha}
        <button
          onClick={refreshCaptcha}
          className="h-full w-[25px] flex justify-center items-center absolute right-[7px]"
        >
          <img className="w-full h-[54%] rounded-full 
         dark:filter dark:invert dark:opacity-[0.6]" src={refIMG} />
        </button>
      </div>
    </div>
  );
};

export { TestCaptcha };
