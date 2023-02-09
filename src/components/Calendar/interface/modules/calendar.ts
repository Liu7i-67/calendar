/*
 * @Author: liu7i
 * @Date: 2023-01-20 15:52:56
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-01-20 17:02:24
 */

import type { IView } from "..";

export interface ICalendarApi {
  /** @param 日历当前时间 */
  date: Date;
  /** @param 展示的视图信息 */
  views: IView[];
  /** @param 当前展示的视图信息 */
  view: IView;
  /** @function 改变当前激活的视图 */
  changeView: (v: IView) => void;
  /**
   * @function 向前跳转时间
   * @params newDate 日历新的日期
   */
  backDate: (newDate?: Date) => void;
  /**
   * @function 向后跳转时间
   * @params newDate 日历新的日期
   */
  nextDate: (newDate?: Date) => void;
}
