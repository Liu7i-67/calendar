/*
 * @Author: liu7i
 * @Date: 2023-02-08 11:30:33
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-02-08 11:53:10
 */

import { style } from "@vanilla-extract/css";
import { vars } from "../index.css";

export const toolBar = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const toolBarLeft = style({
  display: "flex",
  alignItems: "center",
});

export const toolBarLeftBtn = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "22px",
  height: "22px",
  borderRadius: "50%",
  border: `1px solid ${vars.color.main}`,
  color: vars.color.main,
  fontSize: "10px",
  cursor: "pointer",
});

export const toolBarLeftTitle = style({
  marginLeft: "8px",
  fontWeight: "bold",
  fontSize: "16px",
});

export const toolBarCenter = style({
  display: "flex",
  borderRight: `1px solid ${vars.color.main}`,
  borderRadius: "15px",
});

export const toolBarCenterBtn = style({
  width: "72px",
  height: "30px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: `1px solid ${vars.color.main}`,
  color: vars.color.main,
  fontWeight: "bold",
  borderRight: "none",
  cursor: "pointer",
  selectors: {
    "&.active": {
      backgroundColor: vars.color.main,
      color: vars.color.write,
    },
    "&:first-child": {
      borderTopLeftRadius: "15px",
      borderBottomLeftRadius: "15px",
    },
    "&:last-child": {
      borderTopRightRadius: "15px",
      borderBottomRightRadius: "15px",
    },
  },
});
