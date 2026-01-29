import { useState } from "react"
import ProfilePopover from "./ProfilePopover"

const Profile = () => {
    const [anchorEl, setAnchorEl] = useState<any>(null)
  return (
    <>
    <div className="w-12 h-12 border-3 rounded-full cursor-pointer" onClick={e => setAnchorEl(e.currentTarget)}></div>

    {
        anchorEl && <ProfilePopover anchorEl={anchorEl} onClose={() => setAnchorEl(null)}/>
    }
    </>
  )
}

export default Profile