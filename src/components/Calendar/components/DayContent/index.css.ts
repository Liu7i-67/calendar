/*
 * @Author: liu7i
 * @Date: 2023-02-14 10:54:08
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-02-14 11:55:22
 */
import { style } from "@vanilla-extract/css";
import { vars } from "../index.css";

export const Day = style({
  position: "relative",
  display: "flex",
  paddingRight: "20px",
});

export const TimeRow = style({
  display: "flex",
  flexDirection: "column",
  width: vars.rangeLineWidth,
  borderBottom: `1px solid ${vars.borderColor}`,
});

export const TimeRowItem = style({
  flex: 1,
  borderTop: `1px solid ${vars.borderColor}`,
  borderRight: `1px solid ${vars.borderColor}`,
});

export const DayRow = style({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  background: vars.disabledBg,
  borderBottom: `1px solid ${vars.borderColor}`,
});

export const DayRowItem = style({
  height: "42px",
  textAlign: "center",
  borderTop: `1px solid ${vars.borderColor}`,
  borderRight: `1px solid ${vars.borderColor}`,
});

export const NowLine = style({
  position: "absolute",
  width: `calc(100% - 20px - ${vars.rangeLineWidth})`,
  height: "2px",
  top: "20%",
  left: vars.rangeLineWidth,
  background: vars.nowLineColor,
  pointerEvents: "none",
});
