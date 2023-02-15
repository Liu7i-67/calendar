/*
 * @Author: liu7i
 * @Date: 2023-02-14 10:54:08
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-02-15 16:08:23
 */
import { style } from "@vanilla-extract/css";
import { vars } from "../index.css";

export const DayBoxStyle = style({
  position: "relative",
  height: "650px",
  overflowY: "auto",
});

export const DayTitle = style({
  position: "sticky",
  top: 0,
  display: "flex",
  height: "35px",
  paddingRight: "20px",
  zIndex: 100,
});

export const TitleTimeRow = style({
  width: vars.rangeLineWidth,
  borderRight: `1px solid ${vars.borderColor}`,
  borderBottom: "1px solid rgba(0,0,0,0)",
});

export const TitleDayRow = style({
  display: "flex",
  flex: 1,
  marginBottom: "-1px",
  background: vars.colBgColor,
  alignItems: "center",
  justifyContent: "center",
  border: `1px solid ${vars.borderColor}`,
  borderLeft: "none",
});

export const Day = style({
  position: "relative",
});

export const DayBg = style({
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
  fontSize: "22px",
  paddingTop: "8px",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  color: vars.rangeColor,
  borderTop: `1px solid ${vars.borderColor}`,
  borderRight: `1px solid ${vars.borderColor}`,
  selectors: {
    ["&.block"]: {
      borderTop: "none",
    },
  },
});

export const TimeRowItemTips = style({
  fontSize: "12px",
  margin: "-4px 0 0 2px",
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

export const DragStyle = style({
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  zIndex: 100,
  pointerEvents: "none",
  display: "flex",
  paddingRight: "20px",
});

export const DragTimeRowItem = style({
  height: "42px",
  background: `rgba(255, 243, 200,0.5)`,
});

export const DragDayRow = style({
  display: "flex",
  flexDirection: "column",
  flex: 1,
});

export const DragDayRowItem = style({
  height: "42px",
  textAlign: "center",
  borderTop: `1px solid ${vars.borderColor}`,
  borderRight: `1px solid ${vars.borderColor}`,
  background: `rgba(253, 240, 255,0.5)`,
});
