import { Register } from "./register/register";
import { Log } from "./register/log";
import { Login } from "./login/login";
import { Reg } from "./login/reg";
import { useAnimationControls } from "framer-motion";
import { useState } from "react";

const Auth = () => {
  const [show, setShow] = useState(true);

  const signIn = useAnimationControls();
  const log = useAnimationControls();
  const dataRegister = useAnimationControls();
  const dataLog = useAnimationControls();

  const login = useAnimationControls();
  const reg = useAnimationControls();
  const dataLogin = useAnimationControls();
  const dataReg = useAnimationControls();
  

  const handleAnimate = () => {
    log.start({
      x: "-400px",
      transition: { duration: 0.92 },
    });
    signIn.start({
      x: "400px",
      transition: { duration: 1.7 },
      zIndex: "999",
    });

    dataRegister.start({
      opacity: "0",
      transition: { duration: 0.9 },
    });
    dataLog.start({
      opacity: "0",
      transition: { duration: 0.9 },
    });

    setTimeout(() => setShow(true), 1000);
  };

  const loginHandleAnimate = () => {
    login.start({
      x: "-400px",
      transition: { duration: 0.7 },
      zIndex: "999",
    });
    reg.start({
      x: "400px",
      transition: { duration: 0.7 },
    });

    dataReg.start({
      opacity: "0",
      transition: { duration: 0.9 },
    });
    dataLogin.start({
      opacity: "0",
      transition: { duration: 0.9 },
    });

    setTimeout(() => setShow(false), 1000);
  };

  return (
    <div className="flex items-center justify-center w-full h-full p-[70px_0_70px] select-none">
      <div
        className="w-[1110px] h-[700px] m-auto
       
       max-[1110px]:w-[clamp(100px,100%,700px)] max-[1110px]:h-[1200px] 
       max-[700px]:w-[500px] max-[700px]:h-[850px]
       max-[515px]:w-[390px] max-[515px]:h-[660px]"
      >
        {!show ? (
          <>
            <Log log={log} handleAnimate={handleAnimate} dataLog={dataLog} />
            <Register signIn={signIn} dataRegister={dataRegister} />
          </>
        ) : (
          <>
            <Login login={login} dataLogin={dataLogin} />
            <Reg
              reg={reg}
              loginHandleAnimate={loginHandleAnimate}
              dataReg={dataReg}
            />
          </>
        )}
      </div>
    </div>
  );
};

export { Auth };
