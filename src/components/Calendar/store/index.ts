/*
 * @Author: liu7i
 * @Date: 2023-02-09 11:20:27
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-02-14 18:27:02
 */
import React, { useCallback, useMemo } from "react";
import { useImmer } from "@quarkunlimit/immer";
import { createStore } from "@quarkunlimit/tiny";
import { useMethods, useMount } from "@quarkunlimit/react-hooks";
import type {
  ICalendarProps,
  IStore,
  IView,
  IEventCol,
  TDayRender,
} from "../interface";
import { EView, EOptionType } from "../interface";
import { useCommonMethods } from "./subStore/useCommonMethods";
import { useCommonComputed } from "./subStore/useCommonComputed";
import { useDayMethod } from "./subStore/useDayMethod";

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
  temDragData: [],
};

export function useStore(props: ICalendarProps) {
  const [data, setData] = useImmer<IStore>(initStore);
  const commonMethod = useCommonMethods({ data, setData, props });
  const commonComputed = useCommonComputed({ data, setData, props });
  const dayMethod = useDayMethod({ data, setData, props });

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
    changeView: commonMethod.changeView,
    /** @function 向前调整日期 */
    backDate: commonMethod.backDate,
    /** @function 向后调整日期 */
    nextDate: commonMethod.nextDate,
    /** @function 回到现在 */
    backToNow: commonMethod.backToNow,
    /** @function 日模式背景相关操作 */
    dayBgOption: dayMethod.dayBgOption,
    setData,
  });

  return {
    props,
    data: data as IStore,
    methods,
    computed: {
      colItems: commonComputed.colItems,
    },
  };
}

export const RootStore = createStore(useStore);
