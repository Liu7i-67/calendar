/*
 * @Author: liu7i
 * @Date: 2023-02-14 18:03:12
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-02-14 18:05:27
 */

import { useMemo } from "react";
import type { IEventCol, TDayRender } from "components/Calendar/interface";
import { EView } from "components/Calendar/interface";
import { RootStore } from "components/Calendar/store";
import dayjs from "dayjs";

export const useDayRenderData = () => {
  const data = RootStore.useSelector((r) => r.data);
  const computed = RootStore.useSelector((r) => r.computed);

  return useMemo(() => {
    // 生成格子
    const arr: IEventCol[] = [];
    const rangeArr: IEventCol[] = [];

    if (![EView.DAY, EView.WEEK].includes(data.view.type)) {
      return [
        {
          range: rangeArr,
          content: [],
        },
      ] as TDayRender;
    }

    const timeStr = dayjs(data.date).format("YYYY-MM-DD");
    let start = dayjs(timeStr)
      .set("hours", data.timeStar)
      .format(`${timeStr} HH:00:00`);
    let end = "";
    if (data.timeEnd > 23) {
      end = dayjs(timeStr).add(1, "day").format("YYYY-MM-DD 00:00:00");
    } else {
      end = dayjs(timeStr)
        .set("hours", data.timeEnd)
        .format(`${timeStr} HH:00:00`);
    }
    let index = 0;

    while (dayjs(start).isBefore(end)) {
      index += 1;
      let nexStart = dayjs(start)
        .add(data.timeRange, "minutes")
        .format(`YYYY-MM-DD HH:mm:ss`);
      arr.push({
        id: "" + index,
        colId: "",
        startTimeStr: start,
        endTimeStr: nexStart,
      });

      rangeArr.push({
        id: "" + index,
        colId: "calendar-range",
        startTimeStr: start,
        endTimeStr: nexStart,
        isRangeBlock: start !== dayjs(start).format(`${timeStr} HH:00:00`),
      });

      start = nexStart;
    }

    const content: IEventCol[][] = [];
    if (computed.colItems?.length) {
      computed.colItems.forEach((i) => {
        content.push(arr.map((j) => ({ ...j, colId: i.id })));
      });
    } else {
      content.push(arr);
    }

    return [
      {
        range: rangeArr,
        content,
      },
    ] as TDayRender;
  }, [
    data.view,
    data.timeRange,
    data.timeStar,
    data.timeEnd,
    data.date,
    computed.colItems,
  ]);
};
