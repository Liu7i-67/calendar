/*
 * @Author: liu7i
 * @Date: 2023-02-14 18:03:12
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-03-08 11:25:51
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
  IDayEventLayerMask,
  IEventMore,
  IEventContent,
} from "components/Calendar/interface";
import { EView } from "components/Calendar/interface";
import { RootStore } from "components/Calendar/store";
import { DH, getSEInfo, checkRangeBeMixed } from "components/Calendar/utils";
import dayjs from "dayjs";

export const useDayRenderData = () => {
  const data = RootStore.useSelector((r) => r.data);
  const props = RootStore.useSelector((r) => r.props);
  const computed = RootStore.useSelector((r) => r.computed);

  // 生成背景层
  const bgRender = useMemo(() => {
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

  // 生成拖动层
  const dragEventRender = useMemo(() => {
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

  // 背景事件层
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

  // 事件层
  const eventRender = useMemo(() => {
    // 生成遮罩背景
    if (![EView.DAY, EView.WEEK].includes(data.view.type)) {
      return {
        range: [],
        content: [],
      } as IDayEventLayerMask;
    }

    // 如果没有遮罩事件
    if (!props.events?.length || !computed.colItems?.length) {
      return {
        range: [],
        content: [],
      } as IDayEventLayerMask;
    }

    const content: IEventContent[] = [];

    const todayStr = DH(data.date).format("YYYY-MM-DD");

    // 筛选出当天的事件
    const todayEvents =
      props.events?.filter(
        (i) => DH(i.startTimeStr).format("YYYY-MM-DD") === todayStr
      ) || [];
    // 按当前可视专家进行分组
    const colEvents: {
      [key: string]: IEvent[];
    } = {};

    const colIds = new Set(computed.colItems.map((c) => c.id) || []);

    computed.colItems.forEach((c) => {
      colEvents[c.id] = [];
    });

    for (let i = 0; i < todayEvents?.length - 1; i++) {
      if (colIds.has(todayEvents[i].colId)) {
        colEvents[todayEvents[i].colId].push({ ...todayEvents[i] });
      }
    }
    // 计算出当前分辨率以及展示的专家数可以同时展示的最大预约数
    const maxAppoint = 6;

    // 生成多个时间段集合
    const length = (data.timeEnd - data.timeStar) * (60 / data.timeRange);
    const range = data.timeRange * 60 * 1000;
    const start = new Date(
      `${todayStr} ${`${data.timeStar}`.padStart(2, "0")}:00:00`
    ).getTime();
    const rangeArr: IEventMore[] = [];
    for (let i = 0; i < length; i++) {
      const time = start + range * i;
      rangeArr.push({
        startTimeStr: dayjs(time).format("YYYY-MM-DD HH:mm:ss"),
        endTimeStr: dayjs(time + range).format("YYYY-MM-DD HH:mm:ss"),
        id: time + "",
        colId: "",
        moreEvent: [],
        allEvent: [],
        showEvent: [],
        index: 1,
      });
    }

    const maxMin = (data.timeEnd - data.timeStar) * 60;

    computed.colItems.forEach((c) => {
      const colEvent = (colEvents[c.id] || []).slice();
      // 如果这个客户没有预约信息
      if (!colEvent.length) {
        content.push({ allEvent: [], moreInfo: [], showEvent: [] });
        return;
      }

      const box: IEvent[][] = [];

      colEvent.forEach((e) => {
        if (box.length === 0) {
          e.styleInfo = {
            left: 0,
          };
          box.push([e]);
          return;
        }
        const index = box.findIndex(
          (eArr) =>
            !eArr.every(
              (i) =>
                !checkRangeBeMixed(
                  { s: e.startTimeStr, e: e.endTimeStr },
                  { s: i.startTimeStr, e: i.endTimeStr }
                )
            )
        );

        if (index) {
          box[index].push(e);
          e.styleInfo = {
            left: index,
          };
          return;
        }

        e.styleInfo = {
          left: box.length,
        };

        box.push([e]);
      });

      // 克隆一份
      const rangeA = rangeArr.slice();
      rangeA.forEach((r) => {
        r.allEvent = colEvent.filter((i) =>
          checkRangeBeMixed(
            { s: r.startTimeStr, e: r.endTimeStr },
            { s: i.startTimeStr, e: i.endTimeStr }
          )
        );
        const showEvent: IEvent[] = [];
        const moreEvent: IEvent[] = [];
        r.allEvent.forEach((e) => {
          if ((e.styleInfo?.left ?? 0) + 1 > maxAppoint) {
            moreEvent.push(e);
            return;
          }
          showEvent.push(e);
        });
        r.moreEvent = moreEvent;
        r.showEvent = showEvent;
      });

      const resColEvent: IEvent[] = [];

      colEvent.forEach((e) => {
        const block = Math.max(...rangeA.map((r) => r.showEvent.length));

        const eMin =
          (+dayjs(e.startTimeStr).format("HH") - data.timeStar) * 60 +
          +dayjs(e.startTimeStr).format("mm");
        const eRangeMin =
          +dayjs(e.endTimeStr).format("HH") * 60 +
          +dayjs(e.endTimeStr).format("mm") -
          (+dayjs(e.startTimeStr).format("HH") * 60 +
            +dayjs(e.startTimeStr).format("mm"));

        e.styleInfo = {
          ...e.styleInfo,
          block,
        };

        const left = e.styleInfo.left as number;

        e.style = {
          width: `calc(${(1 / Math.min(block, maxAppoint)) * 100}% - 4px)`,
          top: `${(eMin / maxMin) * 100}%`,
          left: `${(left / Math.min(box.length, maxAppoint)) * 100}%`,
          height: `calc(${(eRangeMin / maxMin) * 100}% - 2px)`,
        };

        if (left <= maxAppoint - 1) {
          resColEvent.push(e);
        }
      });

      if (!colEvent?.length) {
        return;
      }

      content.push({
        allEvent: colEvent,
        moreInfo: rangeA,
        showEvent: resColEvent,
      });
    });

    return {
      range: [],
      content,
    };
  }, [
    props.events,
    computed.colItems,
    data.view,
    data.date,
    data.timeEnd,
    data.timeStar,
    data.timeRange,
  ]);

  return [
    bgRender,
    maskEventRender,
    eventRender,
    dragEventRender,
  ] as TDayRender;
};
