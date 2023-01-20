/*
 * @Author: liu7i
 * @Date: 2023-01-20 15:51:42
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-01-20 16:59:55
 */
import type { ICalendarApi } from "./modules/calendar";
import type { EView } from "./modules/enum";

export interface IView {
  /** @param 类型 */
  type: EView;
  /** @param 名称 需要唯一 */
  title: string;
}

export interface ICalendarProps {
  children: (ref: ICalendarApi) => React.ReactElement;
  /** @param 默认初始时间 */
  defaultDate?: Date;
  /** @param 需要展示的视图 默认展示年月日视图 */
  views?: IView[];
  /** @param 默认初始展示的视图 */
  defaultView?: IView;
}

export * from "./modules/calendar";
export * from "./modules/store";
export * from "./modules/enum";
