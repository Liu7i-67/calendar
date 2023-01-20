/*
 * @Author: liu7i
 * @Date: 2023-01-20 16:27:47
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-01-20 17:23:55
 */

import React from "react";
import type { ICalendarApi } from "components/Calendar";
import dayjs from "dayjs";
import { cnWeekDay } from "components/Calendar/utils";
import "./index.css";

const ToolBar = function ToolBar_(props: { cRef: ICalendarApi }) {
  const { cRef } = props;
  return (
    <div className="calendar-toolbar">
      <div className="calendar-toolbar-left">
        <i className="iconfont icon-mjiantou-copy1 calendar-toolbar-left-change-date-btn" />
        <span className="calendar-toolbar-left-title">
          {dayjs(cRef.date).format("YYYY年 MM月DD日")}（
          {
            cnWeekDay[
              +dayjs(cRef.date).format("d") as 0 | 1 | 2 | 3 | 4 | 5 | 6
            ]
          }
          ）
        </span>
        <i className="iconfont icon-mjiantou-copy calendar-toolbar-left-change-date-btn" />
      </div>
      <div className="calendar-toolbar-center">
        {cRef.views.map((v) => (
          <div
            key={v.title}
            className={`calendar-toolbar-center-btn ${
              cRef.view.title === v.title ? "active" : ""
            }`}
            onClick={() => {
              cRef.changeView(v);
            }}
          >
            {v.title}
          </div>
        ))}
      </div>
      <div>right</div>
    </div>
  );
};

export default ToolBar;
