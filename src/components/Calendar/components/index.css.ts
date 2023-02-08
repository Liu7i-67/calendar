/*
 * @Author: liu7i
 * @Date: 2023-02-08 11:27:11
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-02-08 11:55:57
 */

import { createTheme } from "@vanilla-extract/css";

export const [themeClass, vars] = createTheme({
  color: {
    /** @param 主题色 */
    main: "#598fec",
    /** @param 白色 */
    write: "#ffffff",
  },
  font: {
    /** @param 普通字号 */
    normal: "14px",
  },
});

export const otherThemeClass = createTheme(vars, {
  ...vars,
  color: {
    main: "red",
    write: "#ffffff",
  },
});
