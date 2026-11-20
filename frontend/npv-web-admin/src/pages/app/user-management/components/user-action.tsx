import React, { useState } from "react";
import { IconButton, MenuItem, Popover } from "@mui/material";
import { MdOutlineMoreVert } from "react-icons/md";
import { IUser } from "../../../../types";
import { MANAGE_USER_URL } from "../../../../utils";
import { generatePath, useNavigate } from "react-router-dom";
// import { NpvButton } from "../../../../components";

export const ActionCell: React.FC<{ row: IUser }> = ({ row }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleActionClick = (userId: string) => {
    handleClose();

    const path = generatePath(MANAGE_USER_URL, { userId });
    navigate(path);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton onClick={handleClick}>
        <MdOutlineMoreVert />
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        className="!border-lg">
        <MenuItem
          onClick={() => handleActionClick(row?.id ? row.id.toString() : "")}
          className="!font-semibold !text-[15px] !text-gray-500 !py-3">
          View
        </MenuItem>
      </Popover>
    </>
  );
};
