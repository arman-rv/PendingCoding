import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { Proposal } from "./ProposalComponent";
import { cn } from "../../libs/utils";
import style from "../components/style/rotate.module.css"

const NotFound = () => {
  return (
    <div
      className="flex justify-center items-center flex-col p-[0_40px_150px] bg-[#EEEEEE]
    dark:bg-gray-800"
    >
      <img src={logo} className={cn("m-[20px_0_30px] width-[20px] h-[280px] dark:filter dark:invert dark:opacity-[0.38] dark:brightness-0" , style.rotate)} />

      <h1
        className="text-[36px] text-[#505050]
      dark:text-gray-300
      
      max-[700px]:text-center"
      >
        این صفحه در آکادمی وجود ندارد !
      </h1>
      <p
        className="text-[20px] text-[#A4A4A4] m-[15px_0_25px]
      dark:text-gray-200"
      >
        {" "}
        صفحه مورد نظر یافت نشد.
      </p>

      <Link
        to="/"
        className="
       bg-[#505050] cursor-pointer rounded-[50px] text-[18px] text-white w-[210px] p-[12px_0] text-center mb-[30px] hover:bg-[#868686] transition
       dark:bg-gray-600 dark:hover:bg-gray-500
          
       max-[700px]:mb-[20px]"
      >
        {" "}
        بازگشت
      </Link>

      <p
        className="text-[22px] text-[#505050] p-[0_15px_0_300px] border-r-[#5C55C9] border-solid border-[3px] border-t-transparent border-b-transparent border-l-transparent mb-[30px]
      dark:text-gray-300
      
      max-[460px]:mr-[80px]"
      >
        {" "}
        صفحات پیشنهادی{" "}
      </p>

      <Proposal to={"/courses"} title={"دوره ها"} />
      <Proposal to={"/blogs"} title={"بلاگ"} />
      <Proposal to={"/teachers"} title={"اساتید"} />
      <Proposal to={"/contact-us"} title={"ارتباط با ما"} />
    </div>
  );
};

export { NotFound };
