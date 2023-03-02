/*
 * @Author: liu7i
 * @Date: 2023-02-14 18:03:12
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-02-22 14:39:42
 */

import { useMemo } from "react";
import type {
  IEventCol,
  TDayRender,
  IDayLayerBg,
  IEvent,
  IMaskEvent,
  IDayLayerDrag,
  IDayLayerMask,
} from "components/Calendar/interface";
import { EView } from "components/Calendar/interface";
import { RootStore } from "components/Calendar/store";
import { DH, getSEInfo } from "components/Calendar/utils";
import dayjs from "dayjs";

export const useDayRenderData = () => {
  const data = RootStore.useSelector((r) => r.data);
  const props = RootStore.useSelector((r) => r.props);
  const computed = RootStore.useSelector((r) => r.computed);

  const bgRender = useMemo(() => {
    // 生成背景
    const arr: IEventCol[] = [];
    const rangeArr: IEventCol[] = [];

    if (![EView.DAY, EView.WEEK].includes(data.view.type)) {
      return {
        range: rangeArr,
        content: [],
      } as IDayLayerBg;
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
    } as IDayLayerBg;
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

    const { start, end, colId } = getSEInfo(data.temDragData);
    // 对比起始点和结束点位置

    const tempEvent: IEvent = {
      id: "calendar-template",
      colId,
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

  const maskEventRender = useMemo(() => {
    // 生成遮罩背景
    if (![EView.DAY, EView.WEEK].includes(data.view.type)) {
      return {
        range: [],
        content: [],
      } as IDayLayerMask;
    }

    // 如果没有遮罩事件
    if (!props.maskEvents?.length) {
      return {
        range: [],
        content: [],
      } as IDayLayerMask;
    }

    const content: IMaskEvent[][] = [];

    /** @param 今天的str */
    const todayStr = DH(data.date).format("YYYY-MM-DD");
    /** @param 今天开始时间的str */
    const rangeStartStr = `${todayStr} ${`${data.timeStar}`.padStart(
      2,
      "0"
    )}:00:00`;
    /** @param 今天结束时间的str */
    const rangeEndStr = `${todayStr} ${`${data.timeEnd}`.padStart(
      2,
      "0"
    )}:00:00`;

    computed.colItems.forEach((c) => {
      // 筛选出该专家相关的禁用时间
      const disableTimes = props.maskEvents?.filter((i) => {
        // 是否为当前专家 true为是
        const isNowColItem = i.colId === c.id;
        // 是否为当天
        const isTodayS = DH(i.startTimeStr).format("YYYY-MM-DD") === todayStr;
        const isTodayE = DH(i.endTimeStr).format("YYYY-MM-DD") === todayStr;
        return isNowColItem && isTodayS && isTodayE;
      });

      if (!disableTimes?.length) {
        content.push([]);
        return;
      }

      const arr: IMaskEvent[] = [];

      const maxRange = data.timeEnd - data.timeStar;

      // 如果专家有禁用时间（暂未处理传递的个时间块有重叠的情况）
      disableTimes.forEach((d) => {
        let startStr = d.startTimeStr;
        let endStr = d.endTimeStr;
        // 判断事件的开始时间是否在开始时间段之前
        if (dayjs(d.startTimeStr).isBefore(rangeStartStr)) {
          startStr = rangeStartStr;
        }
        // 判断事件的结束时间是否在结束时间段之后
        if (dayjs(d.endTimeStr).isAfter(rangeEndStr)) {
          endStr = rangeEndStr;
        }

        // 判断一下开始时间和结束时间是否相同
        if (startStr === endStr) {
          return;
        }

        const eventRange =
          (new Date(endStr).getTime() - new Date(startStr).getTime()) /
          (1000 * 60 * 60);
        const startRange =
          (new Date(startStr).getTime() - new Date(rangeStartStr).getTime()) /
          (1000 * 60 * 60);

        arr.push({
          colId: d.colId,
          startTimeStr: startStr,
          endTimeStr: endStr,
          style: {
            height: `${Math.abs((eventRange / maxRange) * 100)}%`,
            top: `${Math.abs((startRange / maxRange) * 100)}%`,
            width: `100%`,
          },
        });
      });

      content.push(arr);
    });

    return {
      range: [],
      content,
    } as IDayLayerMask;
  }, [
    data.date,
    data.view,
    computed.colItems,
    data.timeStar,
    data.timeEnd,
    data.timeRange,
    props.maskEvents,
  ]);

  return [bgRender, maskEventRender, dragEventRender] as TDayRender;
};
