import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Reg = ({reg , loginHandleAnimate , dataReg}) => {
  return (
    <motion.div
      animate={reg}
      className="w-[700px] h-[700px] rounded-[100%] bg-[#505050] flex float-left mt-[-700px] justify-end items-center  text-white text-center transition
      dark:bg-gray-600 dark:text-white
    
      max-[1110px]:mt-[-200px] max-[1110px]:justify-center
      max-[700px]:w-[500px] max-[700px]:h-[500px] max-[700px]:mt-[-150px]
      max-[515px]:w-[390px] max-[515px]:h-[390px]
      max-[515px]:-mt-[120px]"
    >
      {" "}
      {/* {style.reg} */}
      <motion.div
      animate={dataReg}
        className="w-[380px] ml-[30px] flex flex-col flex-wrap gap-[25px] items-center max-[1110px]:m-[100px_0_0_0]
      
      max-[700px]:gap-[15px]"
      >
        {" "}
        {/* {style.main} */}
        <h1
          className="text-[24px] m-[0_0_10px]
        
        max-[700px]:m-[0]
        max-[515px]:text-lg"
        >
          هنوز ثبت نام نکرده ایید؟
        </h1>{" "}
        {/* {style.title} */}
        <p className="text-[14px]
        max-[515px]:text-xs max-[515px]:px-6">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و .با
          استفاده از طراحان گرافیک است
        </p>{" "}
        {/* {style.p} */}
        <p className="text-[14px] w-[320px]
        max-[515px]:text-xs max-[515px]:px-5">
          لطفا برای ثبت نام ابتدا{" "}
          <Link
            to="/terms-and-conditions"
            className="cursor-pointer text-[#00FFF6]"
          >
            قوانین و مقررات{" "}
          </Link>
          آکادمی پندینگ کدینگ را مطالعه وسپس برای ثبت نام اقدام فرمایید
        </p>{" "}
        {/* {style.p} */}
        <button
          onClick={loginHandleAnimate}
          className="text-[#505050] bg-[#EEEEEE] rounded-[50px] text-[18px] p-[10px_0] w-[300px] m-[20px_0] hover:bg-[#DDDDDD] transition
          dark:bg-[rgb(113,123,136)] dark:text-white dark:hover:bg-[rgb(122,132,146)]
        
          max-[700px]:p-[7px_0] max-[700px]:w-[270px] overflow-hidden relative
          max-[515px]:text-sm max-[515px]:w-[210px]"
        >
          {/* <Link
            to="/sign-up"
            className="w-full h-full absolute cursor-pointer top-0 left-0"
          ></Link> */}
          ثبت نام
        </button>{" "}
      </motion.div>
    </motion.div>
  );
};

export { Reg };
