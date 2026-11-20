import React, { useState } from "react";
import { IconButton, MenuItem, Popover } from "@mui/material";
import { MdOutlineMoreVert } from "react-icons/md";
import { generatePath, useNavigate } from "react-router-dom";
import { MANAGE_PROPERTY_URL } from "../../../../utils";

export const ActionCell: React.FC<{ row: any }> = ({ row }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleActionClick = (propertyId: string) => {
    handleClose();
    const path = generatePath(MANAGE_PROPERTY_URL, { propertyId });
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
        }}>
        <MenuItem
          onClick={() => handleActionClick(row.id)}
          className="!font-bold !text-[15px] !py-4">
          Manage
        </MenuItem>
      </Popover>
    </>
  );
};
