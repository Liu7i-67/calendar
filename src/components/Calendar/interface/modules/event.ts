/*
 * @Author: liu7i
 * @Date: 2023-02-13 18:09:22
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-02-14 11:11:14
 */

export interface IEvent {
  /** @param 事件唯一标识符 */
  id: string;
  /** @param 事件所属专家id */
  colId: string;
  /** @param 事件开始时间 */
  startTime?: Date;
  /** @param 事件结束时间 */
  endTime?: Date;
  /** @param 事件开始时间 YYYY-MM-DD HH:mm:ss */
  startTimeStr: string;
  /** @param 事件结束时间 YYYY-MM-DD HH:mm:ss */
  endTimeStr: string;
  /** @param 事件标题 */
  title: string;
  /** @param 是否可拖动 默认为true */
  canDrag?: boolean;
  [key: string]: any;
}

export interface IEventCol {
  /** @param 唯一标识符 */
  id: string;
  /** @param 事件所属专家id */
  colId: string;
  /** @param 事件开始时间 */
  startTime?: Date;
  /** @param 事件结束时间 */
  endTime?: Date;
  /** @param 事件开始时间 YYYY-MM-DD HH:mm:ss */
  startTimeStr: string;
  /** @param 事件结束时间 YYYY-MM-DD HH:mm:ss */
  endTimeStr: string;
}

export interface IColItem {
  /** @param 唯一标识符 和事件的colId关联 */
  id: string;
  /** @param 名称 */
  title: string;
}

export interface IDayLayer1 {
  /** @param 时间轴信息 */
  range: IEventCol[];
  /** @param 内容信息 */
  content: IEventCol[][];
}

export type TDayRender = [IDayLayer1];
