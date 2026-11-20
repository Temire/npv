import React, { useState } from "react";
import {
  IconButton,
  MenuItem,
  Popover,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { MdOutlineMoreVert } from "react-icons/md";
import { manageAdminUser } from "../../../../services";
import toast from "react-hot-toast";
import { IUser } from "../../../../types";
import { BsExclamation } from "react-icons/bs";

export const AdminActionCell: React.FC<{
  row: IUser;
  refetch_admins: () => void;
}> = ({ row, refetch_admins }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onManageAdminUser = useMutation({
    mutationKey: ["manageAdminUser"],
    mutationFn: manageAdminUser,
    onSuccess() {
      toast.success("Admin status updated successfully");
      refetch_admins();
      setTimeout(() => {
        refetch_admins();
      }, 1000);
    },
    onError(error) {
      console.log(error);
      toast.success(
        "Failed to update admin user status. Please try again later."
      );
    }
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleActionClick = () => {
    handleClose();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    handleCloseModal();
    onManageAdminUser.mutate({ userId: row.id, activeStatus: !row.active });
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
          onClick={handleActionClick}
          className="!font-bold !text-[15px] !py-4">
          {row.active ? (
            <span className="text-red-600">Deactivate Admin user</span>
          ) : (
            <span className="text-green-600">Activate Admin user</span>
          )}
        </MenuItem>
      </Popover>
      <Dialog
        open={isModalOpen}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
        classes={{
          paper: "rounded-lg shadow-xl"
        }}>
        <DialogTitle className="!bg-npv_purple !text-white !px-6 !py-4">
          <h3 className="text-lg font-semibold">
            Confirm {row.active ? "Deactivation" : "Activation"}
          </h3>
        </DialogTitle>
        <DialogContent className="!px-6 !py-4">
          <div className="flex items-center bg-yellow-100 text-yellow-800 p-4 rounded-md mb-4">
            <BsExclamation className="mr-2" />
            <p className="text-sm">
              This action will {row.active ? "restrict" : "grant"} admin access
              to the system.
            </p>
          </div>
          <p className="text-gray-700">
            Are you sure you want to {row.active ? "deactivate" : "activate"}{" "}
            the admin user{" "}
            <span className="font-semibold">
              {row?.firstName + " " + row?.lastName || row.email}
            </span>
            ?
          </p>
        </DialogContent>
        <DialogActions className="!px-6 !py-4 !border-t !border-gray-200">
          <Button
            onClick={handleCloseModal}
            className="!px-4 !py-2 !text-gray-600 !hover:bg-gray-100 !rounded !font-semibold !normal-case">
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            className={`!px-4 !py-2 !text-white !rounded !font-semibold !normal-case ${
              row.active
                ? "!bg-red-600 hover:!bg-red-700"
                : "!bg-green-600 hover:!bg-green-700"
            }`}>
            {row.active ? "Deactivate" : "Activate"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
