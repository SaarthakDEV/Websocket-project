import { useState } from "react";
import Graph from "../Graph";
import Navbar from "../Navbar";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const Upper = () => {
  const [expand, setExpand] = useState<boolean>(false);
  return (
    <div
      className={`${expand ? "h-[60vh]" : "h-[20vh]"} rounded-b-3xl border-1 bg-black flex flex-col transition-all`}
    >
      <Navbar />
    
      { expand && <Graph /> } 
      <div className={`flex justify-center ${!expand && "m-[1rem]"}`}>
        {expand ? (
          <IoIosArrowUp
            size={50}
            className="text-[#ffffff3b] hover:text-white cursor-pointer"
            onClick={() => setExpand(false)}
          />
        ) : (
          <IoIosArrowDown
            size={50}
            className="text-[#ffffff3b] hover:text-white cursor-pointer"
            onClick={() => setExpand(true)}
          />
        )}
      </div>
    </div>
  );
};

export default Upper;
