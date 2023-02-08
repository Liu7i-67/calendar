/*
 * @Author: liu7i
 * @Date: 2023-01-20 15:51:24
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-02-08 14:24:15
 */

import React from "react";
import type { ICalendarProps, IStore, IView } from "./interface";
import { EView } from "./interface";
import { useMount } from "hooks/useMount";

const initViews: IView[] = [
  { type: EView.DAY, title: "日" },
  { type: EView.WEEK, title: "周" },
  { type: EView.MONTH, title: "月" },
  { type: EView.YEAR, title: "年" },
];

const Calendar = function Calendar_(props: ICalendarProps) {
  const [store, setStore] = React.useState<IStore>({
    date: props.defaultDate || new Date(),
    views: props.views || initViews,
    view: props.defaultView || (props.views || initViews)[0],
  });

  useMount(() => {
    console.log("挂载时Props：", props);
  }, []);

  const changeView = React.useCallback((v: IView) => {
    setStore((o) => ({
      ...o,
      view: v,
    }));
  }, []);

  return (
    <div>
      {props.children({
        date: store.date,
        views: store.views,
        view: store.view,
        changeView,
      })}
    </div>
  );
};

export default Calendar;

export * from "./interface";
export * from "./components/index.css";
