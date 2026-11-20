import { Dialog, DialogProps } from "@mui/material";
import * as React from "react";
// import { TransitionProps } from "@mui/material/transitions";
import IconButton from "@mui/material/IconButton";
// import Slide from "@mui/material/Slide";
// import { FaX } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";

// const Transition = React.forwardRef(function Transition(
//   props: TransitionProps & {
//     children: React.ReactElement;
//   },
//   ref: React.Ref<unknown>
// ) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

export const NpvDialog: React.FC<Props> = ({
  title,
  details,
  dialogProps,
  children,
  width,
  id,
  size
}) => {
  return (
    <Dialog
      id={id}
      fullWidth={true}
      maxWidth={size || "md"}
      sx={{
        "& .MuiDialog-container": {
          width: width ?? width,
          "& .MuiPaper-root": {
            maxHeight: "828px",
            overflow: "auto"
          }
        }
      }}
      {...dialogProps}
      //   TransitionComponent={Transition}
    >
      <div className="p-14 bg-white overflow-y">
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <h5 className="text-py_black-950 text-[1.25rem] font-semibold">
              {title}
            </h5>

            {/* Close Button */}
            <IconButton
              edge="start"
              color="inherit"
              onClick={(e) => {
                dialogProps?.onClose && dialogProps.onClose(e, "escapeKeyDown");
              }}
              aria-label="close">
              <div className="text-black">
                <FaXmark />
              </div>
            </IconButton>
          </div>
          <p className="text-py_black-700 font-normal text-[0.875rem]">
            {details}
          </p>
        </div>

        <div className="h-calc(100vh - 100px) overflow-y-auto">{children}</div>
      </div>
    </Dialog>
  );
};

interface Props {
  title?: string;
  details?: string;
  dialogProps: DialogProps;
  children?: React.ReactNode;
  showCloseIcon?: boolean;
  width?: string;
  id?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}
