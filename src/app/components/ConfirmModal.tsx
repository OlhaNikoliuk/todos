import React from "react";
import { Button, Modal } from "@mui/material";
import { IoMdClose } from "react-icons/io";

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  text: string;
  handleConfirm: () => void;
  confirmBtnText?: string;
  handleReject: () => void;
  rejectBtnText?: string;
  isLoading?: boolean;
}

export const ConfirmModal = ({
  open,
  onClose,
  text,
  handleConfirm,
  confirmBtnText = "Confirm",
  handleReject,
  rejectBtnText = "Close",
  isLoading = false,
}: ConfirmModalProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      className="w-screen h-screen relative"
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className="flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2 p-10  w-400 m-auto  flex align-center justify-center rounded-md bg-dark">
        <IoMdClose
          size={24}
          className="fill-white absolute top-3 right-3 cursor-pointer"
          onClick={onClose}
        />
        <p className="text-white text-lg  font-semibold mb-8">{text}</p>
        <div className="flex justify-end text-white flex gap-8">
          <button
            disabled={isLoading}
            onClick={handleReject}
            id="reject-button"
            className="bg-white text-bright px-6 py-3 rounded-md  text-white font-semibold text-md flex items-center justify-center"
          >
            {rejectBtnText}
          </button>
          <button
            disabled={isLoading}
            onClick={handleConfirm}
            id="confirm-button"
            className="bg-main-gradient px-6 py-3 rounded-md text-white font-semibold text-md flex items-center justify-center"
          >
            {confirmBtnText}
          </button>
        </div>
      </div>
    </Modal>
  );
};
