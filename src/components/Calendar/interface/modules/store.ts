/*
 * @Author: liu7i
 * @Date: 2023-01-20 16:10:32
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-01-20 17:00:19
 */

import type { IView } from "../index";

export interface IStore {
  /** @param 日历当前的时间 */
  date: Date;
  /** @param 展示的视图信息 */
  views: IView[];
  /** @param 当前展示的视图 */
  view: IView;
}
