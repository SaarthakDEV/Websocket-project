import { ListItemIcon, ListItemText, MenuItem, MenuList, Popover } from "@mui/material";
import { FaUser } from "react-icons/fa";

interface ProfilePopoverProps {
  anchorEl: any;
  onClose: (value: boolean) => void;
}

const ProfilePopover: React.FC<ProfilePopoverProps> = ({
  anchorEl,
  onClose,
}) => {
  const open = Boolean(anchorEl);
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <div className="w-[10rem]">
        <MenuList>
          <MenuItem>
          <ListItemIcon>
            <FaUser />
          </ListItemIcon>
            <ListItemText>Login</ListItemText>
          </MenuItem>
        </MenuList>
      </div>
    </Popover>
  );
};

export default ProfilePopover;
