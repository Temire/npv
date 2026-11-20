/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Dialog, DialogProps, IconButton, Slide } from "@mui/material";
import * as React from "react";
import { FaRegCircleXmark } from "react-icons/fa6";
import { uploadFile } from "../../services";
import { useUser } from "../../context";
import toast from "react-hot-toast";
import { NpvButton } from "../button";
import { TransitionProps } from "@mui/material/transitions";
import { useMutation } from "@tanstack/react-query";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const FileUploadDialog: React.FC<Props> = ({
  title,
  dialogProps,
  setUploadedFile
}) => {
  const documentRef = React.useRef<any>(null);

  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

  const { user } = useUser();

  const onUploadFile = useMutation({
    mutationKey: ["uploadUserId"],

    mutationFn: (payload: any) =>
      uploadFile({
        userId: user?.id,
        payload
      }),

    onSuccess(data: any) {
      console.log(data);
      dialogProps?.onClose && dialogProps.onClose(data, "escapeKeyDown");
      //   setOpenImageDialog(false);
      setUploadedFile(data);
    },

    onError(error: any) {
      console.log(error);
      toast.error(
        "An error occurred while uploading your file, please try again."
      );
    }
  });

  const handleUploadFile = () => {
    const fileData = new FormData();

    if (selectedFile) {
      fileData.append("file", selectedFile);
      console.log(selectedFile);

      onUploadFile.mutate(fileData);
    }
  };

  const handleDocumentInputChange = (event: any) => {
    const selectedFile = event.target.files[0];
    setSelectedFile(selectedFile);
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth={"md"}
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            maxHeight: "828px",
            overflow: "auto"
          }
        }
      }}
      {...dialogProps}
      TransitionComponent={Transition}>
      <div className="p-14 bg-white overflow-y">
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <h5 className="text-py_black-950 text-[1.25rem] font-semibold">
              {title || "Upload file"}
            </h5>

            {/* Close Button */}
            <IconButton
              edge="start"
              color="inherit"
              onClick={(e) => {
                dialogProps?.onClose && dialogProps.onClose(e, "escapeKeyDown");
              }}
              aria-label="close">
              <div className="text-npv_grey">
                <FaRegCircleXmark />
              </div>
            </IconButton>
          </div>
        </div>

        <div className="h-calc(100vh - 100px) overflow-y-auto">
          {selectedFile ? (
            <>
              {selectedFile.type.startsWith("image") ? (
                <img
                  src={URL.createObjectURL(selectedFile)}
                  className="h-[200px] w-full rounded-[12px] shadow-[1px_0px_4px_0px_#2D2D2D4] object-contain"
                />
              ) : (
                <div className="w-full border-[2px] border-npv_purple/75 shadow-[1px_0px_4px_0px_#2D2D2D4] bg-[#80008008] border-dashed rounded-[12px] mt-6 p-6 flex items-center font-semibold">
                  {selectedFile.name}
                </div>
              )}

              <input
                ref={documentRef}
                className="invisible absolute top-0 left-0 w-full h-full z-20 cursor-pointer"
                type="file"
                multiple
                onChange={(e) => handleDocumentInputChange(e)}
                accept=".pdf, .png, .jpeg, .jpg"
              />

              <Button
                className="!text-[10px] !text-npv_purple !normal-case !font-semibold"
                onClick={() => {
                  setSelectedFile(null);
                  documentRef.current.click();
                }}>
                Change
              </Button>
            </>
          ) : (
            <>
              <div className="w-full border-[2px] border-npv_purple/75 shadow-[1px_0px_4px_0px_#2D2D2D4] bg-[#80008008] border-dashed rounded-[12px] my-6 p-6 h-[250px] flex items-center justify-center">
                <div className="flex flex-col gap-2 items-center">
                  <p className="text-npv_grey font-semibold text-[16px]">
                    Drag and drop file to upload
                  </p>
                  <p className="text-npv_grey font-medium text-[12px]">or</p>
                  <NpvButton click={() => documentRef.current.click()}>
                    Select file
                  </NpvButton>
                </div>
              </div>
              <input
                ref={documentRef}
                className="invisible absolute top-0 left-0 w-full h-full z-20 cursor-pointer"
                type="file"
                multiple
                onChange={(e) => handleDocumentInputChange(e)}
                accept=".pdf, .png, .jpeg, .jpg"
              />
            </>
          )}

          <div className="mt-6 lg:mt-10 flex items-center gap-4 justify-center">
            <NpvButton
              variant="SecondaryOutline"
              click={(e: any) => {
                // setOpenImageDialog(false);
                dialogProps?.onClose && dialogProps.onClose(e, "escapeKeyDown");

                setSelectedFile(null);
              }}>
              Cancel
            </NpvButton>
            <NpvButton
              isDisabled={!selectedFile || onUploadFile.isPending}
              loading={onUploadFile.isPending}
              click={handleUploadFile}>
              Upload
            </NpvButton>
          </div>
        </div>
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
  setUploadedFile?: any;
}
