/*
 * @Author: liu7i
 * @Date: 2023-02-08 14:36:17
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-02-08 14:43:04
 */
import { style } from "@vanilla-extract/css";
import { vars } from "../index.css";

export const nr_button = style({
  padding: "0 10px",
  height: "32px",
  background: vars.writeColor,
  border: `1px solid ${vars.mainColor}`,
  color: vars.mainColor,
  minWidth: "80px",
  borderRadius: "16px",
  fontSize: vars.normalFontSize,
  selectors: {
    "&.primary_btn": {
      background: vars.mainColor,
      color: vars.writeColor,
    },
  },
});
