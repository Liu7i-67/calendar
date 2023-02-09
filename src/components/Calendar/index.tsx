/*
 * @Author: liu7i
 * @Date: 2023-01-20 15:51:24
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-02-09 11:34:31
 */

import React from "react";
import type { ICalendarProps } from "./interface";
import { RootStore } from "./store";

const Calendar = function Calendar_() {
  const data = RootStore.useSelector((root) => root.data);
  const methods = RootStore.useSelector((root) => root.methods);
  const props = RootStore.useSelector((root) => root.props);

  return (
    <div>
      {props.children({
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
      <Calendar />
    </RootStore.Provider>
  );
}

export * from "./interface";
export * from "./components/index.css";
export * from "./components/Button";
export * from "./components/ErrorBoundary";
export * from "./components/ToolBar";
