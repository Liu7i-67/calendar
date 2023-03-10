/*
 * @Author: liu7i
 * @Date: 2023-02-09 11:20:27
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-02-22 11:45:27
 */
import React, { useEffect } from "react";
import { useImmer } from "@quarkunlimit/immer";
import { createStore } from "@quarkunlimit/tiny";
import { useMethods, useMount } from "@quarkunlimit/react-hooks";
import { ICalendarProps, IStore, IView } from "../interface";
import { EView } from "../interface";
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
  touchInterval: 300,
  appDragFlag: false,
  touchData: [],
  isWeb: true,
  eventDrag: {},
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
      o.view = props.defaultView ?? o.views[0];
      o.timeRange = props.timeRange ?? initStore.timeRange;
      o.timeStar = props.timeStar ?? initStore.timeStar;
      o.timeEnd = props.timeEnd ?? initStore.timeEnd;
      o.minColNum = props.minColNum ?? initStore.minColNum;
      o.maxColNum = props.maxColNum ?? initStore.maxColNum;
      o.touchInterval = props.touchInterval ?? initStore.touchInterval;
    });
  });

  useEffect(() => {
    setData((o) => {
      o.index = 1;
    });
  }, [props.colItems]);

  const methods = useMethods({
    /** @function 改变当前激活的日历模式 */
    changeView: commonMethod.changeView,
    /** @function 向前调整日期 */
    backDate: commonMethod.backDate,
    /** @function 向后调整日期 */
    nextDate: commonMethod.nextDate,
    /** @function 回到现在 */
    backToNow: commonMethod.backToNow,
    /** @function 日模式背景相关操作-web端 */
    dayBgOptionWeb: dayMethod.dayBgOptionWeb,
    /** @function 日模式背景相关操作-app端 */
    dayBgOptionApp: dayMethod.dayBgOptionApp,
    /** @function 日模式事件拖拽相关操作-仅web端 */
    dayEventDrag: dayMethod.dayEventDrag,
    /** @function 日模式清空事件操作 */
    clearEventDayDrag: dayMethod.clearEventDayDrag,
    /** @function 鼠标在事件上滑动时移除300ms的延迟限制 */
    clearTimeDelay: dayMethod.clearTimeDelay,
    setData,
    /** @function 展示下一页专家信息 */
    nextColItems: commonMethod.nextColItems,
    /** @function 展示上一页专家信息 */
    preColItems: commonMethod.preColItems,
    /** @function 减少每页可视专家数量 */
    reducePageSize: commonMethod.reducePageSize,
    /** @function 增加每页可视专家数量 */
    addPageSize: commonMethod.addPageSize,
  });

  return {
    props,
    data: data as IStore,
    methods,
    computed: {
      colItems: commonComputed.colItems,
      canAddCol: commonComputed.canAddCol,
      canReduceCol: commonComputed.canReduceCol,
    },
  };
}

export const RootStore = createStore(useStore);
