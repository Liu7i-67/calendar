/*
 * @Author: liu7i
 * @Date: 2023-01-20 15:51:24
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-02-09 11:47:43
 */

import React from "react";
import type { ICalendarProps, ICalendarApi } from "./interface";
import { RootStore } from "./store";

const Calendar = function Calendar_({
  children,
}: {
  children: (ref: ICalendarApi) => React.ReactNode;
}) {
  const data = RootStore.useSelector((root) => root.data);
  const methods = RootStore.useSelector((root) => root.methods);

  return (
    <div>
      {children?.({
        date: data.date,
        views: data.views,
        view: data.view,
        changeView: methods.changeView,
        backDate: methods.backDate,
        nextDate: methods.nextDate,
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
