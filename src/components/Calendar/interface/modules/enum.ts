/*
 * @Author: liu7i
 * @Date: 2023-01-20 16:12:16
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-02-15 10:22:39
 */

export enum EView {
  /** @param 日视图 */
  DAY = "DAY",
  /** @param 周视图 */
  WEEK = "WEEK",
  /** @param 月视图 */
  MONTH = "MONTH",
  /** @param 年视图 */
  YEAR = "YEAR",
  /** @param 自定义视图 */
  DIY = "DIY",
}

export enum EOptionTypeWeb {
  MOUSEDOWN = "mousedown",
  MOUSEUP = "mouseup",
  MOUSEMOVE = "mousemove",
}

export enum EOptionTypeApp {
  TOUCHMOVE = "touchmove",
  TOUCHSTART = "touchstart",
  TOUCHEND = "touchend",
}

export enum EOptionType {
  MOUSEDOWN = "mousedown",
  MOUSEUP = "mouseup",
  MOUSEMOVE = "mousemove",
  TOUCHMOVE = "touchmove",
  TOUCHSTART = "touchstart",
  TOUCHEND = "touchend",
}
