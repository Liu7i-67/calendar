/*
 * @Author: liu7i
 * @Date: 2023-01-20 15:51:42
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-02-22 11:43:26
 */
import type { ICalendarApi } from "./modules/calendar";
import type { EView } from "./modules/enum";
import type { IPropsInit, IStore } from "./modules/store";
import type { IEvent, IColItem, IMaskEvent } from "./modules/event";
import type { Draft, Immutable } from "immer";
import type { IAddRangeInfo } from "./modules/drag";

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
  /** @param 遮罩事件-禁用时间 */
  maskEvents?: IMaskEvent[];
  /** @param 专家信息 */
  colItems?: IColItem[];
  /** @function 视图改变时触发的事件 */
  onViewChange?: (nView: IView) => void;
  /** @function 新增事件 */
  onEventAdd?: (range: IAddRangeInfo) => void;
}

export interface IDropDownContent {
  /** @param 唯一key */
  key: string;
  node: React.ReactNode;
}

declare type Recipe<S = any> = (
  this: Draft<S>,
  draftState: Draft<S>
) => void | S;
export type TUpdate<S = any> = (recipe: Recipe<S>) => void;

export interface ISubRootProps {
  data: Immutable<IStore>;
  setData: TUpdate<IStore>;
  props: ICalendarProps;
}

export * from "./modules/calendar";
export * from "./modules/store";
export * from "./modules/enum";
export * from "./modules/event";
export * from "./modules/drag";
