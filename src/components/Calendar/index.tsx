/*
 * @Author: liu7i
 * @Date: 2023-01-20 15:51:24
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-02-14 18:06:07
 */

import React from "react";
import type { ICalendarProps, ICalendarApi } from "./interface";
import { RootStore } from "./store";
import { useDayRenderData } from "./store/dayHook/useDayRenderData";

const Calendar = function Calendar_({
  children,
}: {
  children: (ref: ICalendarApi) => React.ReactNode;
}) {
  const data = RootStore.useSelector((root) => root.data);
  const methods = RootStore.useSelector((root) => root.methods);
  const computed = RootStore.useSelector((root) => root.computed);
  const dayRender = useDayRenderData();

  return (
    <div>
      {children?.({
        date: data.date,
        views: data.views,
        view: data.view,
        dayRender: dayRender,
        colItems: computed.colItems,
        changeView: methods.changeView,
        backDate: methods.backDate,
        nextDate: methods.nextDate,
        backToNow: methods.backToNow,
        dayBgOption: methods.dayBgOption,
      })}
    </div>
  );
};

export default function Calendar_(props: ICalendarProps) {
  return (
    <RootStore.Provider {...props}>
      <Calendar children={props.children} />
    </RootStore.Provider>
  );
}

export * from "./interface";
export * from "./components/index.css";
export * from "./components/Button";
export * from "./components/ErrorBoundary";
export * from "./components/ToolBar";
export * from "./components/Dropdown";
export * from "./components/DayContent";
