/*
 * @Author: liu7i
 * @Date: 2023-01-20 16:12:16
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-02-14 16:35:28
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

export enum EOptionType {
  mousedown = "mousedown",
  mouseup = "mouseup",
  mousemove = "mousemove",
  touchmove = "touchmove",
  touchstart = "touchstart",
  touchend = "touchend",
}
