/*
 * @Author: liu7i
 * @Date: 2023-02-08 14:30:22
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-02-08 14:43:41
 */

import React from "react";
import { nr_button } from "./index.css";

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  children?: React.ReactNode;
}

const Button = function Button_(props: IButtonProps) {
  const { label, children, type, className, ...arg } = props;
  return (
    <button
      type="button"
      className={`${nr_button} ${className ?? ""}`}
      {...arg}
    >
      {children ?? props.label}
    </button>
  );
};

export default Button;
