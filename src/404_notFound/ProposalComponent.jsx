import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Proposal = ({ to, title }) => {
  return (
    <div
      className="relative h-[87px] w-[clamp(100px,95%,489px)] border-solid border-[4px] border-[#868686] rounded-[200px] overflow-hidden mb-[30px]
    dark:border-gray-500
    
    max-[550px]:h-[60px]"
    >
      <div
        className="w-[clamp(50px,100%,108px)] h-full bg-[#868686] 
    dark:bg-gray-500"
      >
        {" "}
      </div>
      <Link
        to={to}
        className="w-full h-full absolute top-0 cursor-pointer text-center leading-[87px] text-[33px] text-[#6e6e6e]
     dark:text-gray-300
     
     max-[550px]:text-[26px] max-[550px]:leading-[60px]
     max-[460px]:text-left max-[460px]:pl-[30px]"
      >
        {title}
      </Link>
    </div>
  );
};

export { Proposal };
