/*
 * @Author: liu7i
 * @Date: 2023-02-08 11:27:11
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-02-08 15:02:10
 */

import { createTheme } from "@vanilla-extract/css";

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

  /** @param 普通字号 */
  normalFontSize: "14px",
});
