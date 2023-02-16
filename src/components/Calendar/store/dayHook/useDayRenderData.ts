/*
 * @Author: liu7i
 * @Date: 2023-02-14 18:03:12
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-02-15 16:12:50
 */

import { useMemo } from "react";
import type {
  IEventCol,
  TDayRender,
  IDayLayerBg,
  IEvent,
  IDayLayerDrag,
} from "components/Calendar/interface";
import { EView } from "components/Calendar/interface";
import { RootStore } from "components/Calendar/store";
import dayjs from "dayjs";

export const useDayRenderData = () => {
  const data = RootStore.useSelector((r) => r.data);
  const computed = RootStore.useSelector((r) => r.computed);

  const bgRender = useMemo(() => {
    // 生成背景
    const arr: IEventCol[] = [];
    const rangeArr: IEventCol[] = [];

    if (![EView.DAY, EView.WEEK].includes(data.view.type)) {
      return {
        range: rangeArr,
        content: [],
      };
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

    let rangColId = "calendar-range";
    if (computed.colItems?.[0]) {
      rangColId = computed.colItems[0].id;
    }

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
        colId: rangColId,
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

    return {
      range: rangeArr,
      content,
    };
  }, [
    data.view,
    data.timeRange,
    data.timeStar,
    data.timeEnd,
    data.date,
    computed.colItems,
  ]);

  const dragEventRender = useMemo(() => {
    // 生成背景
    const rangeArr: IEvent[] = [];

    if (![EView.DAY, EView.WEEK].includes(data.view.type)) {
      return {
        range: rangeArr,
        content: [],
      } as IDayLayerDrag;
    }

    // 拖拽信息不足
    if (data.temDragData.length !== 2) {
      return {
        range: rangeArr,
        content: [],
      } as IDayLayerDrag;
    }

    const colF = data.temDragData[0].col;
    const colS = data.temDragData[1].col;
    // 对比起始点和结束点位置
    let start: IEventCol = colF;
    let end: IEventCol = colS;

    if (dayjs(colF.startTimeStr).isAfter(colS.startTimeStr)) {
      start = colS;
      end = colF;
    }

    const tempEvent: IEvent = {
      id: "calendar-template",
      colId: colS.colId,
      startTimeStr: start.startTimeStr,
      endTimeStr:
        start.startTimeStr === end.startTimeStr
          ? end.endTimeStr
          : end.startTimeStr,
      title: "新内容",
    };

    const eventRange = +end.id - +start.id + 1;
    const startRange = +start.id - 1;
    const maxRange = (data.timeEnd - data.timeStar) * (60 / data.timeRange);
    tempEvent.style = {
      height: `${Math.abs((eventRange / maxRange) * 100)}%`,
      top: `${Math.abs((startRange / maxRange) * 100)}%`,
      width: `100%`,
    };

    rangeArr.push({ ...tempEvent, id: "calendar-template-range" });

    const content: IEventCol[][] = [];
    if (computed.colItems?.length) {
      computed.colItems.forEach((i) => {
        content.push(i.id === tempEvent.colId ? [tempEvent] : []);
      });
    } else {
      content.push([tempEvent]);
    }

    return {
      range: rangeArr,
      content,
    } as IDayLayerDrag;
  }, [
    data.view,
    computed.colItems,
    data.temDragData,
    data.timeStar,
    data.timeEnd,
    data.timeRange,
  ]);

  return [bgRender, dragEventRender] as TDayRender;
};
