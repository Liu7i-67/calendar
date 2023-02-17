/*
 * @Author: liu7i
 * @Date: 2023-02-17 11:38:17
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-02-17 11:42:10
 */

import type { IDragEvent, IEventCol } from "../../interface";
import dayjs from "dayjs";

/** @function 判断两个格子的先后  */
export const getSEInfo = (data: IDragEvent[]) => {
  const colF = data[0].col;
  const colS = data[1].col;
  // 对比起始点和结束点位置
  let start: IEventCol = colF;
  let end: IEventCol = colS;

  if (dayjs(colF.startTimeStr).isAfter(colS.startTimeStr)) {
    start = colS;
    end = colF;
  }
  return { start, end, colId: data[1].col.colId };
};
