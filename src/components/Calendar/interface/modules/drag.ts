/*
 * @Author: liu7i
 * @Date: 2023-02-14 18:19:37
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-02-17 11:34:34
 */
import type {
  EOptionTypeWeb,
  EOptionTypeApp,
  IEventCol,
  IEvent,
} from "../index";

export interface IDragEvent {
  /** @param 操作类型 */
  type: EOptionTypeWeb | EOptionTypeApp;
  /** @param 格子信息 */
  col: IEventCol;
  x?: number;
  y?: number;
  /** @param 触发时的时间戳 */
  time: number;
}

export interface IAddRangeInfo {
  /** @param 起始时间 */
  startTime: string;
  /** @param 结束时间 */
  endTime: string;
  /** @param 专家id */
  colId: string;
}

export interface IDayEventDrag {
  /** @param 事件-仅拖动开始时触发 */
  et?: IEvent;
  /** @param 事件触发点的信息 */
  e: React.MouseEvent<HTMLDivElement>;
  /** @param 目标经过的位置-仅移动和拖动结束时触发 */
  c?: IEventCol;
}
