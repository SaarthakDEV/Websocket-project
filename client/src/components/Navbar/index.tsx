import { Divider } from "@mui/material"
import Profile from "../Profile"
import { MdBrightness6 } from "react-icons/md";

const Navbar = () => {
  return (
    <div className="text-white px-6 py-4 border-b flex justify-between items-center gap-4">
        <div className="text-3xl font-bold cursor-pointer">Taper</div>
        <Divider orientation="vertical" variant="middle" flexItem className="bg-white w-1"/>
        <div className="flex-1"></div>
        <Divider orientation="vertical" variant="middle" flexItem className="bg-white w-1"/>
        <div className="flex items-center gap-6">
<MdBrightness6 size={30} className="cursor-pointer hover:scale(1.5)" />
            <Profile />
        </div>
    </div>
  )
}

export default Navbar