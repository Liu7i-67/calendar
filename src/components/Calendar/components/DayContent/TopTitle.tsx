/*
 * @Author: liu7i
 * @Date: 2023-02-14 14:16:19
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-02-16 18:20:37
 */

import React from "react";
import type { ICalendarApi } from "components/Calendar";
import {
  DayTitle,
  TitleTimeRow,
  TitleDayRow,
  PreColBtn,
  PreRightBtn,
} from "./index.css";

export interface ITopTitleProps {
  cRef: ICalendarApi;
}

const TopTitle = function TopTitle_(props: ITopTitleProps) {
  const { cRef } = props;
  return (
    <div className={DayTitle}>
      <div className={TitleTimeRow}></div>
      {cRef.colItems.map((c) => (
        <div className={TitleDayRow} key={c.id}>
          {c.title}
        </div>
      ))}
      {cRef.canReduceCol && (
        <i
          className={`iconfont icon-mjiantou-copy1 ${PreColBtn}`}
          onClick={cRef.preColItems}
        />
      )}
      {cRef.canAddCol && (
        <i
          className={`iconfont icon-mjiantou-copy ${PreRightBtn}`}
          onClick={cRef.nextColItems}
        />
      )}
    </div>
  );
};

export default TopTitle;
