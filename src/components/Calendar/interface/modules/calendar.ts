/*
 * @Author: liu7i
 * @Date: 2023-01-20 15:52:56
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-02-15 10:24:41
 */

import React from "react";
import type { IView, TDayRender, IColItem, IEventCol, EOptionType } from "..";

export interface ICalendarApi {
  /** @param 日历当前时间 */
  date: Date;
  /** @param 展示的视图信息 */
  views: IView[];
  /** @param 当前展示的视图信息 */
  view: IView;
  /** @param 日视图渲染相关数据 */
  dayRender: TDayRender;
  /** @param 当前展示的专家信息 */
  colItems: IColItem[];
  /** @function 改变当前激活的视图 */
  changeView: (v: IView) => void;
  /**
   * @function 向前跳转时间
   * @params newDate 日历新的日期-用于自定义模式
   */
  backDate: (newDate?: Date) => void;
  /**
   * @function 向后跳转时间
   * @params newDate 日历新的日期-用于自定义模式
   */
  nextDate: (newDate?: Date) => void;
  /**
   * @function 回到现在
   * @params newDate 日历新的日期-用于自定义模式
   */
  backToNow: (newDate?: Date) => void;
  /** @function 日模式背景web端相关操作 */
  dayBgOptionWeb: (c: IEventCol, e: React.MouseEvent<HTMLDivElement>) => void;
  /** @function 日模式背景app端相关操作 */
  dayBgOptionApp: (c: IEventCol, e: React.TouchEvent<HTMLDivElement>) => void;
}
