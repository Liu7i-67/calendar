/*
 * @Author: liu7i
 * @Date: 2023-02-08 11:27:11
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-02-17 11:16:08
 */

import { createTheme, style } from "@vanilla-extract/css";

export const [themeClass, vars] = createTheme({
  /** @param 主题色 */
  mainColor: "#598fec",
  /** @param 日视图减少专家数背景色 */
  dayReduceBtnBgColor: "#EBF2FD",
  /** @param 日视图减少专家数颜色 */
  dayReduceBtnColor: "#B4CDF5",
  /** @param 日视图减少专家数后面的小竖线颜色 */
  dayReduceBtnBeforeBgColor: "#BFD4F7",
  /** @param 日视图增加专家数背景色 */
  dayAddBtnBgColor: "#DEE9FB",
  /** @param 日视图增加专家数颜色 */
  dayAddBtnColor: "#5997EA",
  /** @param 白色 */
  writeColor: "#ffffff",
  /** @parma 无排班背景色 */
  disabledBg: "#EFF4F8",
  /** @param 有排班背景色 */
  normalBg: "#FFFFF9",
  /** @param 边框色 */
  borderColor: "#CECECE",
  /** @param 当前时间颜色 */
  nowLineColor: "#F77B7D",
  /** @param header专家背景色 */
  colBgColor: "#EFF3FA",
  /** @param 时间轴字体颜色 */
  rangeColor: "#767676",

  /** @param 普通字号 */
  normalFontSize: "14px",

  /** @param 时间轴列的宽度 */
  rangeLineWidth: "50px",
  /** @param 日历主体和滚动条的间距 */
  scrollPadding: "20px",
});
