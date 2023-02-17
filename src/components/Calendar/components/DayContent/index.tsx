/*
 * @Author: liu7i
 * @Date: 2023-02-14 10:53:58
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-02-16 16:42:57
 */
import React from "react";
import type { ICalendarApi } from "components/Calendar";
import {
  Day,
  DayBoxStyle,
  DayTitle,
  TitleTimeRow,
  TitleDayRow,
} from "./index.css";
import Background from "./Background";
import Drag from "./Drag";
import TopTitle from "./TopTitle";

export interface IDayContentProps {
  cRef: ICalendarApi;
  /** @param 开始时间（日-周模式）0-24 */
  timeStar: number;
  /** @param 结束时间（日-周模式） 0-24 需要大于timeStar 小于等于timeStar时无效 */
  timeEnd: number;
}

export const DayContent = function DayContent_(props: IDayContentProps) {
  const { cRef, timeStar, timeEnd } = props;

  return (
    <div className={DayBoxStyle}>
      <TopTitle cRef={cRef} />
      <div className={Day}>
        <Background cRef={cRef} timeEnd={timeEnd} timeStar={timeStar} />
        <Drag cRef={cRef} />
      </div>
    </div>
  );
};