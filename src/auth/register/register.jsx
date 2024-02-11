import { useState } from "react";
import { motion } from "framer-motion";
import { FirstStep } from "./first-step";
import { SecondStep } from "./second-step";
import { createContext } from "react";

export const ValidContext = createContext();

const Register = ({ signIn, dataRegister }) => {
  const [step, setStep] = useState(1);

  const [saveUser, setSaveUser] = useState({});

  const [isValid, setIsValid] = useState(false);

  // console.log(isValid)

  return (
    <ValidContext.Provider value={{ isValid, setIsValid }}>
      <motion.div
        animate={signIn}
        className="bg-[#EEEEEE] w-[700px] h-[700px] rounded-[100%] border-[15px] border-solid border-[#505050] flex justify-center items-center mt-[-700px] float-left relative
      dark:bg-gray-800 dark:border-gray-600

       max-[700px]:w-[500px] max-[700px]:h-[500px]"
      >
        <motion.div
          animate={dataRegister}
          className="w-[350px] h-[460px] flex justify-center items-center flex-col flex-nowrap pt-[55px]       
          
         max-[700px]:w-[275px]"
        >
          <h1
            className="text-[#505050] text-[28px] mb-[30px]
              dark:text-gray-300
              
              max-[700px]:mb-[10px] max-[700px]:text-[26px]"
          >
            {" "}
            ثبت نام حساب کاربری{" "}
          </h1>

          {/* {step === 1 && ()} */}
          <FirstStep
            setStep={setStep}
            step={step}
            saveUser={saveUser}
            setSaveUser={setSaveUser}
          />
          {/* {step === 2&& }  */}
          <SecondStep setStep={setStep} saveUser={saveUser} step={step} />

        </motion.div>
      </motion.div>
    </ValidContext.Provider>
  );
};

export { Register };
