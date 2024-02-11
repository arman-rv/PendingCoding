import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Log = ({log , handleAnimate , dataLog}) => {
  return (
    <motion.div
     animate={log}
     className="w-[700px] h-[700px] rounded-[100%] bg-[#505050] flex justify-start   items-center text-[#fff] text-center transition
     dark:bg-gray-600 dark:text-white
     
     max-[1110px]:mt-[-200px] max-[1110px]:justify-center
     max-[700px]:w-[500px] max-[700px]:h-[500px]"
    >

      <motion.div
      animate={dataLog}
       className="w-[380px] mr-[30px] flex flex-col flex-wrap gap-[15px] items-center max-[1110px]:m-[100px_0_0_0]">
        <h1 className="text-[24px]"> قبلا ثبت نام کرده اید؟</h1>
        <p className="text-[14px]">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و .با استفاده از طراحان گرافیک است</p>
        <p className="text-[14px] w-[310px]"> لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و .با استفاده از طراحان گرافیک است </p>

        <button
         onClick={handleAnimate}
         className="text-[#505050] bg-[#EEEEEE] cursor-pointer rounded-[50px] text-[18px] p-[10px_0] w-[300px] m-[20px_0] hover:bg-[#DDDDDD] transition
         dark:bg-[rgb(113,123,136)] dark:text-white dark:hover:bg-[rgb(122,132,146)]
        
         
         max-[700px]:p-[7px_0] max-[700px]:w-[270px]  overflow-hidden relative"
        > ورود 

        </button>
      </motion.div>
    </motion.div>
  )
}

export {Log}