/*
 * @Author: liu7i
 * @Date: 2023-01-20 15:51:42
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-02-14 10:08:26
 */
import type { ICalendarApi } from "./modules/calendar";
import type { EView } from "./modules/enum";
import type { IPropsInit } from "./modules/store";
import type { IEvent, IColItem } from "./modules/event";

export interface IView {
  /** @param 类型 */
  type: EView;
  /** @param 名称 需要唯一 */
  title: string;
}

export interface ICalendarProps extends Partial<IPropsInit> {
  children: (ref: ICalendarApi) => React.ReactElement;
  /** @param 默认初始时间 */
  defaultDate?: Date;
  /** @param 默认初始展示的视图 */
  defaultView?: IView;
  /** @param 事件 */
  events?: IEvent[];
  /** @param 专家信息 */
  colItems?: IColItem[];
}

export interface IDropDownContent {
  /** @param 唯一key */
  key: string;
  node: React.ReactNode;
}

export * from "./modules/calendar";
export * from "./modules/store";
export * from "./modules/enum";
export * from "./modules/event";
