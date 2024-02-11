import { Link } from "react-router-dom";

const InfoComponent = ({ buttonTitle, link ,headerTitle}) => {
  return (
    <div
      className="w-[700px] h-[700px] rounded-[100%] bg-[#505050] flex float-left mt-[-700px] justify-end items-center  text-white text-center transition
      dark:bg-gray-600 dark:text-white
    
      max-[1110px]:mt-[-200px] max-[1110px]:justify-center
      max-[700px]:w-[500px] max-[700px]:h-[500px] max-[700px]:mt-[-150px]"
    >
      <div
        className="w-[380px] ml-[30px] flex flex-col flex-wrap gap-[25px] items-center max-[1110px]:m-[100px_0_0_0]
      
      max-[700px]:gap-[15px]"
      >
        <h1
          className="text-[24px] m-[0_0_10px]
        
        max-[700px]:m-[0]"
        >
          {headerTitle}
        </h1>

        <p className="text-[14px]">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و .با
          استفاده از طراحان گرافیک است
        </p>

        <p className="text-[14px] w-[320px]">
        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و .با
          استفاده از طراحان گرافیک است
        </p>

        <Link
          to={link}
          className="text-[#505050] bg-[#EEEEEE] rounded-[50px] text-[18px] p-[10px_0] w-[300px] m-[20px_0] hover:bg-[#DDDDDD] transition
          dark:bg-[rgb(113,123,136)] dark:text-white dark:hover:bg-[rgb(122,132,146)]
        
          max-[700px]:p-[7px_0] max-[700px]:w-[270px] overflow-hidden relative"
        >
          {buttonTitle}
        </Link>
      </div>
    </div>
  );
};

export { InfoComponent };
