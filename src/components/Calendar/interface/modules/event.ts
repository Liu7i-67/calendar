/*
 * @Author: liu7i
 * @Date: 2023-02-13 18:09:22
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-02-22 11:46:35
 */

import React from "react";

export interface IMaskEvent {
  /** @param 事件所属专家id */
  colId: string;
  /** @param 事件开始时间 YYYY-MM-DD HH:mm:ss */
  startTimeStr: string;
  /** @param 事件结束时间 YYYY-MM-DD HH:mm:ss */
  endTimeStr: string;
  /** @param 布局样式 */
  style?: React.CSSProperties;
}

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
  /** @param 事件的布局样式-内部计算得出 百分比 */
  style?: React.CSSProperties;
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
  /** @param 是否为占位时间轴块 默认为false 否 */
  isRangeBlock?: boolean;
}

export interface IColItem {
  /** @param 唯一标识符 和事件的colId关联 */
  id: string;
  /** @param 名称 */
  title: string;
  [key: string]: any;
}

export interface IDayLayerBg {
  /** @param 时间轴信息 */
  range: IEventCol[];
  /** @param 内容信息 */
  content: IEventCol[][];
}

export interface IDayLayerDrag {
  /** @param 时间轴信息 */
  range: IEvent[];
  /** @param 内容信息 */
  content: IEvent[][];
}

export interface IDayLayerMask {
  /** @param 时间轴信息 */
  range: [];
  /** @param 内容信息 */
  content: IMaskEvent[][];
}

export type TDayRender = [IDayLayerBg, IDayLayerMask, IDayLayerDrag];
