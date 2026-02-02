import { Divider } from "@mui/material";
import Profile from "../Profile";
import { MdBrightness7, MdBrightness5 } from "react-icons/md";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);
  return (
    <div className="text-black dark:text-white px-6 py-4 border-b flex justify-between items-center gap-4">
      <div className="text-3xl font-bold cursor-pointer">Taper</div>
      <Divider
        orientation="vertical"
        variant="middle"
        flexItem
        className="bg-white w-1"
      />
      <div className="flex-1 text-black dark:text-white">Mode</div>
      <Divider
        orientation="vertical"
        variant="middle"
        flexItem
        className="bg-white w-1"
      />
      <div className="flex items-center gap-6">
        {darkMode ? (
          <MdBrightness5 
            size={30}
            className="cursor-pointer hover:scale(1.5)"
            onClick={() => setDarkMode(false)}
          />
        ) : (
          <MdBrightness7
            size={30}
            className="cursor-pointer hover:scale(1.5)"
            onClick={() => setDarkMode(true)}
          />
        )}
        <Profile />
      </div>
    </div>
  );
};

export default Navbar;
