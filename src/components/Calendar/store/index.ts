/*
 * @Author: liu7i
 * @Date: 2023-02-09 11:20:27
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-02-14 14:41:34
 */
import { useCallback, useMemo } from "react";
import { useImmer } from "@quarkunlimit/immer";
import { createStore } from "@quarkunlimit/tiny";
import { useMethods, useMount } from "@quarkunlimit/react-hooks";
import type {
  ICalendarProps,
  IStore,
  IView,
  IEventCol,
  TDayRender,
  IColItem,
} from "../interface";
import { EView } from "../interface";
import dayjs from "dayjs";

const initViews: IView[] = [
  { type: EView.DAY, title: "日" },
  { type: EView.WEEK, title: "周" },
  { type: EView.MONTH, title: "月" },
  { type: EView.YEAR, title: "年" },
];

const initStore: IStore = {
  date: new Date(),
  views: initViews,
  view: initViews[0],
  timeStar: 0,
  timeRange: 15,
  timeEnd: 24,
  minColNum: 7,
  maxColNum: 16,
  index: 1,
  pageSize: 7,
};

export function useStore(props: ICalendarProps) {
  const [data, setData] = useImmer<IStore>(initStore);

  useMount(() => {
    setData((o) => {
      o.date = props.defaultDate ?? initStore.date;
      o.views = props.views ?? initStore.views;
      o.view = o.views[0];
      o.timeRange = props.timeRange ?? initStore.timeRange;
      o.timeStar = props.timeStar ?? initStore.timeStar;
      o.timeEnd = props.timeEnd ?? initStore.timeEnd;
      o.minColNum = props.minColNum ?? initStore.minColNum;
      o.maxColNum = props.maxColNum ?? initStore.maxColNum;
    });
  });

  const methods = useMethods({
    /** @function 改变当前激活的日历模式 */
    changeView: (v: IView) => {
      setData((o) => {
        o.view = v;
      });
    },
    /** @function 向前调整日期 */
    backDate: (newDate?: Date) => {
      if (newDate) {
        setData((o) => {
          o.date = newDate;
        });
        return;
      }

      let oldDate = data.date;
      let unit: dayjs.ManipulateType = "day";

      switch (data.view.type) {
        case EView.DAY:
          {
            unit = "day";
          }
          break;
        case EView.WEEK:
          {
            unit = "week";
          }
          break;
        case EView.MONTH:
          {
            unit = "month";
          }
          break;
        case EView.YEAR: {
          unit = "year";
        }
      }
      setData((o) => {
        o.date = dayjs(oldDate).subtract(1, unit).toDate();
      });
    },
    /** @function 向后调整日期 */
    nextDate: (newDate?: Date) => {
      if (newDate) {
        setData((o) => {
          o.date = newDate;
        });
        return;
      }

      let oldDate = data.date;
      let unit: dayjs.ManipulateType = "day";

      switch (data.view.type) {
        case EView.DAY:
          {
            unit = "day";
          }
          break;
        case EView.WEEK:
          {
            unit = "week";
          }
          break;
        case EView.MONTH:
          {
            unit = "month";
          }
          break;
        case EView.YEAR: {
          unit = "year";
        }
      }
      setData((o) => {
        o.date = dayjs(oldDate).add(1, unit).toDate();
      });
    },
    /** @function 回到现在 */
    backToNow: (newDate?: Date) => {
      if (newDate) {
        setData((o) => {
          o.date = newDate;
        });
        return;
      }
      setData((o) => {
        o.date = new Date();
      });
    },
  });

  const colItems = useMemo(() => {
    let start = (data.index - 1) * data.pageSize - 2;
    if (start < 0) {
      start = 0;
    }
    let end: number | undefined = start + data.pageSize;
    let maxStart = (props.colItems?.length ?? 0) - data.pageSize;
    if (maxStart < start) {
      start = maxStart;
      end = undefined;
    }
    if (start < 0) {
      start = 0;
    }

    const resource_ = (props.colItems || []).slice(start, end);
    return resource_;
  }, [props.colItems, data.index, data.pageSize]);

  const dayRenderData = useMemo(() => {
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

      if (start === dayjs(start).format(`${timeStr} HH:00:00`)) {
        rangeArr.push({
          id: "" + index,
          colId: "calendar-range",
          startTimeStr: start,
          endTimeStr: nexStart,
        });
      }

      start = nexStart;
    }

    const content: IEventCol[][] = [];
    if (colItems?.length) {
      colItems.forEach((i) => {
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
  }, [data.view, data.timeRange, data.timeStar, data.timeEnd, data.date]);

  return {
    props,
    data: data as IStore,
    methods,
    computed: {
      colItems,
      dayRenderData,
    },
  };
}

export const RootStore = createStore(useStore);
