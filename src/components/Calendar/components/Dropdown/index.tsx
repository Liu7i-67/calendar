/*
 * @Author: liu7i
 * @Date: 2023-02-10 11:10:33
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-02-10 11:39:38
 */

import React from "react";
import {
  dropdownContent,
  dropdown,
  dropdownMenu,
  dropdownMenuItem,
} from "./index.css";
import { classNames } from "components/Calendar/utils";
import type { IDropDownContent } from "components/Calendar/interface";

export interface IDropdownProps {
  children: React.ReactNode;
  content: IDropDownContent[];
}

export const Dropdown = function Dropdown_(props: IDropdownProps) {
  const [visible, setVisible] = React.useState<boolean>(false);
  const timer = React.useRef(null);

  const mouseEnter = React.useCallback(() => {
    setVisible(true);
  }, []);

  const mouseLevel = React.useCallback(() => {
    setVisible(false);
  }, []);

  return (
    <div className={dropdown} onMouseLeave={mouseLevel}>
      <div className={dropdownContent} onMouseEnter={mouseEnter}>
        {props.children}
      </div>
      <div className={classNames({ [dropdownMenu]: true, active: visible })}>
        {props.content.map((i) => (
          <div className={dropdownMenuItem} key={i.key}>
            {i.node}
          </div>
        ))}
      </div>
    </div>
  );
};
