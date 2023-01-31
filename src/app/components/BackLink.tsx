import React from "react";
import { Link } from "react-router-dom";
import { IoChevronBackOutline } from "react-icons/io5";

export interface BackLinkProps {
  to: string;
  text: string;
}

const BackLink = ({ to, text }: BackLinkProps) => (
  <Link
    to={to}
    className="flex px-4 py-2 font-bold text-white
     max-w-fit rounded-md cursor-pointer "
  >
    <div className="flex gap-4 flex-nowrap items-center">
      <IoChevronBackOutline />
      <span>{text}</span>
    </div>
  </Link>
);

export default BackLink;
