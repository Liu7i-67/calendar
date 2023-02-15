/*
 * @Author: liu7i
 * @Date: 2023-02-14 18:19:37
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-02-14 18:22:37
 */
import type { EOptionTypeWeb, EOptionTypeApp, IEventCol } from "../index";

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
