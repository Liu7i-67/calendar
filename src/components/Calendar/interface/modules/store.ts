/*
 * @Author: liu7i
 * @Date: 2023-01-20 16:10:32
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-02-15 13:55:06
 */

import type { IView, IDragEvent, IEvent } from "../index";

export interface IPropsInit {
  /** @param 开始时间（日-周模式）0-24 */
  timeStar: number;
  /** @param 最小时间间隔（分钟数，1-60 能被60整除） 默认为 15min 最小为1 */
  timeRange: number;
  /** @param 结束时间（日-周模式） 0-24 需要大于timeStar 小于等于timeStar时无效 */
  timeEnd: number;
  /** @param 展示的视图信息 */
  views: IView[];
  /** @param 日模式最少同时展示的专家数量 最小为1 默认为7 */
  minColNum: number;
  /** @param 日模式最多同时展示的专家数量 最小为1 默认为16 */
  maxColNum: number;
  /** @param 移动端touch灵敏度，单位毫秒 默认为300 */
  touchInterval: number;
  /** @param 最大同时展示数 超出这个数量会展示更多icon，将多出的内容折叠起来 默认为5 */
  maxCellEventNumber?: number;
  /** @function 事件的单击事件 */
  eventClick?: (event: IEvent) => void;
  /** @function 事件的双击事件 */
  eventDoubleClick?: (event: IEvent) => void;
}

export interface IStore extends IPropsInit {
  /** @param 是否为web版 默认为true */
  isWeb: boolean;
  /** @param 日历当前的时间 */
  date: Date;
  /** @param 当前展示的视图 */
  view: IView;
  /** @param 当前展示的专家页码 */
  index: number;
  /** @param 当前每页展示的专家数 */
  pageSize: number;
  /** @param 暂存用户的拖拽行为 */
  temDragData: IDragEvent[];
  /** @param 移动端的操作行为暂存 */
  touchData: IDragEvent[];
  /** @param 移动端是否处于拖拽开关 默认为false */
  appDragFlag: boolean;
}
