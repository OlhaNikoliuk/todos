import React from "react";
import { BsPlusCircleFill } from "react-icons/bs";
import cx from "classnames";

interface AddButtonProps extends React.HTMLProps<HTMLButtonElement> {
  onClick?: () => void;
  text: string;
  className?: string;
}

export const AddButton = ({
  onClick,
  text,
  type,
  className,
  ...props
}: AddButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cx(
        "bg-main-gradient py-3 px-5 rounded-md text-white font-semibold text-md flex items-center justify-center",
        className
      )}
      {...props}
    >
      <BsPlusCircleFill className="inline-flex mr-2" />

      {text}
    </button>
  );
};
