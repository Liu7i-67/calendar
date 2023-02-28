/*
 * @Author: liu7i
 * @Date: 2023-02-14 10:54:08
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-02-17 11:16:38
 */
import { style } from "@vanilla-extract/css";
import { vars } from "../index.css";

export const DayBoxStyle = style({
  position: "relative",
  height: "650px",
  overflowY: "auto",
  userSelect: "none",
});

export const DayTitle = style({
  position: "sticky",
  top: 0,
  display: "flex",
  height: "35px",
  paddingRight: vars.scrollPadding,
  zIndex: 500,
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

export const PreColBtn = style({
  position: "absolute",
  top: "1px",
  left: vars.rangeLineWidth,
  height: "calc(100% - 1px)",
  width: "21px",
  display: "flex",
  alignItems: "center",
  color: vars.mainColor,
  justifyContent: "center",
  background: vars.colBgColor,
  borderRight: `1px solid ${vars.borderColor}`,
  fontSize: "18px",
  cursor: "pointer",
});

export const PreRightBtn = style([
  PreColBtn,
  {
    right: vars.scrollPadding,
    left: "auto",
    borderLeft: `1px solid ${vars.borderColor}`,
  },
]);

export const Day = style({
  position: "relative",
});

export const DayBg = style({
  position: "relative",
  display: "flex",
  paddingRight: vars.scrollPadding,
});

export const TimeRow = style({
  position: "relative",
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
  paddingRight: vars.scrollPadding,
});

export const DragTimeRowItem = style({
  position: "absolute",
  height: "42px",
  background: vars.dragRangeBgColor,
});

export const DragDayRow = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  flex: 1,
});

export const DragDayRowItem = style({
  position: "absolute",
  textAlign: "center",
  borderTop: `1px solid ${vars.borderColor}`,
  borderRight: `1px solid ${vars.borderColor}`,
  background: `rgba(253, 240, 229,0.8)`,
});

export const MarkBg = style({
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  zIndex: -100,
  display: "flex",
  paddingRight: vars.scrollPadding,
  pointerEvents: "none",
});

export const MarkRow = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  flex: 1,
  borderBottom: `1px solid rgba(0,0,0,0)`,
});

export const MarkRowItem = style({
  position: "absolute",
  height: "42px",
  textAlign: "center",
  borderTop: `1px solid ${vars.borderColor}`,
  borderRight: `1px solid ${vars.borderColor}`,
  background: `${vars.disabledBg}`,
});

export const DayRealBg = style({
  position: "absolute",
  display: "flex",
  paddingRight: vars.scrollPadding,
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  zIndex: -200,
  pointerEvents: "none",
});

export const DayRealBgContent = style({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  borderBottom: `1px solid rgba(0,0,0,0)`,
  background: vars.normalBg,
});
