/*
 * @Author: liu7i
 * @Date: 2023-02-08 11:30:33
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-02-17 10:30:20
 */

import { style } from "@vanilla-extract/css";
import { vars } from "../index.css";

export const toolBar = style({
  marginBottom: "18px",
  padding: "0 38px 0 48px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const toolBarLeft = style({
  display: "flex",
  alignItems: "center",
  flex: 2,
});

export const toolBarLeftBtn = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "22px",
  height: "22px",
  borderRadius: "50%",
  border: `1px solid ${vars.mainColor}`,
  color: vars.mainColor,
  fontSize: "10px",
  cursor: "pointer",
});

export const toolBarLeftTitle = style({
  margin: "0 8px",
  fontWeight: "bold",
  fontSize: "16px",
});

export const toolBarBackTodayBtn = style({
  display: "none",
  marginLeft: "16px",
  padding: "4px 8px",
  background: vars.writeColor,
  color: vars.mainColor,
  border: `1px solid ${vars.mainColor}`,
  borderRadius: "16px",
  selectors: {
    ["&:focus"]: {
      outline: "none",
    },
    ["&.show"]: {
      display: "initial",
    },
  },
});

export const toolBarCenter = style({
  display: "flex",
  borderRight: `1px solid ${vars.mainColor}`,
  borderRadius: "15px",
});

export const toolBarCenterBtn = style({
  width: "72px",
  height: "30px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: `1px solid ${vars.mainColor}`,
  color: vars.mainColor,
  fontWeight: "bold",
  borderRight: "none",
  cursor: "pointer",
  selectors: {
    "&.active": {
      backgroundColor: vars.mainColor,
      color: vars.writeColor,
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

export const toolBarRight = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "right",
  flex: 1,
  "@media": {
    "screen and (min-width: 1351px)": {
      flex: 3,
    },
  },
});

export const toolBarRightBtnRight = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "40px",
  height: "32px",
  fontWeight: "bold",
  borderTopRightRadius: "50%",
  borderBottomRightRadius: "50%",
  background: vars.dayAddBtnBgColor,
  color: vars.dayAddBtnColor,
  cursor: "pointer",
});

export const toolBarRightBtnLeft = style([
  toolBarRightBtnRight,
  {
    position: "relative",
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: "50%",
    borderBottomLeftRadius: "50%",
    background: vars.dayReduceBtnBgColor,
    selectors: {
      "&::after": {
        content: "",
        display: "block",
        width: "1px",
        height: "18px",
        background: vars.dayReduceBtnBeforeBgColor,
        position: "absolute",
        right: 0,
        top: "calc(50% - 9px)",
      },
    },
  },
]);

export const toolBarRightContent = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "@media": {
    "screen and (max-width: 1350px)": {
      display: "none",
    },
  },
});

export const toolBarRightMore = style({
  selectors: {
    ["&.hidden"]: {
      display: "none",
    },
  },
  "@media": {
    "screen and (min-width: 1351px)": {
      display: "none",
    },
  },
});
