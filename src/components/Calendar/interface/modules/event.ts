/*
 * @Author: liu7i
 * @Date: 2023-02-13 18:09:22
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-03-08 11:19:17
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
  /** @param 事件的布局辅助信息-用于用户自定义样式 */
  styleInfo?: IStyleInfo;
  [key: string]: any;
}

export interface IStyleInfo {
  /** @param 与该事件有交集的事件共有多少个 */
  block?: number;
  /** @param 该事件左侧有多少列事件 */
  left?: number;
}

export interface IEventMore {
  /** @param 序号 */
  index: number;
  /** @param 事件唯一标识符 */
  id: string;
  /** @param 事件所属专家id */
  colId: string;
  /** @param 事件开始时间 YYYY-MM-DD HH:mm:ss */
  startTimeStr: string;
  /** @param 事件结束时间 YYYY-MM-DD HH:mm:ss */
  endTimeStr: string;
  /** @param 事件的布局样式-内部计算得出 百分比 */
  style?: React.CSSProperties;
  /** @param 隐藏的事件信息 */
  moreEvent: IEvent[];
  /** @param 展示的事件信息 */
  showEvent: IEvent[];
  /** @param 全部的事件信息 */
  allEvent: IEvent[];
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

export interface IDayEventLayerMask {
  /** @param 时间轴信息 */
  range: [];
  /** @param 内容信息 */
  content: IEventContent[];
}

export interface IEventContent {
  /** @param 专家当天全部事件 */
  allEvent: IEvent[];
  /** @param 专家当天展示的事件 */
  showEvent: IEvent[];
  moreInfo: IEventMore[];
}

export type TDayRender = [
  IDayLayerBg,
  IDayLayerMask,
  IDayEventLayerMask,
  IDayLayerDrag
];
