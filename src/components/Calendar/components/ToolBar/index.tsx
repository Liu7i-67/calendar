/*
 * @Author: liu7i
 * @Date: 2023-01-20 16:27:47
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-02-08 11:50:07
 */

import React from "react";
import type { ICalendarApi } from "components/Calendar";
import dayjs from "dayjs";
import { cnWeekDay } from "components/Calendar/utils";
import {
  toolBar,
  toolBarLeft,
  toolBarLeftBtn,
  toolBarLeftTitle,
  toolBarCenter,
  toolBarCenterBtn,
} from "./index.css";

const ToolBar = function ToolBar_(props: { cRef: ICalendarApi }) {
  const { cRef } = props;
  return (
    <div className={toolBar}>
      <div className={toolBarLeft}>
        <i className={`iconfont icon-mjiantou-copy1 ${toolBarLeftBtn}`} />
        <span className={toolBarLeftTitle}>
          {dayjs(cRef.date).format("YYYY年 MM月DD日")}（
          {
            cnWeekDay[
              +dayjs(cRef.date).format("d") as 0 | 1 | 2 | 3 | 4 | 5 | 6
            ]
          }
          ）
        </span>
        <i className={`iconfont icon-mjiantou-copy ${toolBarLeftBtn}`} />
      </div>
      <div className={toolBarCenter}>
        {cRef.views.map((v) => (
          <div
            key={v.title}
            className={`${toolBarCenterBtn} ${
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
