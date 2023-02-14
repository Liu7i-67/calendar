/*
 * @Author: liu7i
 * @Date: 2023-02-14 10:53:58
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-02-14 14:46:31
 */

import React, { useEffect, useState } from "react";
import type { ICalendarApi } from "components/Calendar";
import {
  Day,
  DayRow,
  TimeRow,
  TimeRowItem,
  DayRowItem,
  NowLine,
} from "./index.css";
import dayjs from "dayjs";
import { useMount } from "@/hooks/useMount";

export interface IDayContentProps {
  cRef: ICalendarApi;
  /** @param 开始时间（日-周模式）0-24 */
  timeStar: number;
  /** @param 结束时间（日-周模式） 0-24 需要大于timeStar 小于等于timeStar时无效 */
  timeEnd: number;
}

export const DayContent = function DayContent_(props: IDayContentProps) {
  const { cRef, timeStar, timeEnd } = props;
  console.log("cRef.dayRender:", cRef.dayRender);
  const [lineStyle, setLineStyle] = useState<React.CSSProperties>({ top: "0" });
  const timer = React.useRef<number>(0);

  const calcTop = React.useCallback(() => {
    const range = (timeEnd - timeStar) * 60;
    const now = (dayjs().get("hour") - timeStar) * 60 + dayjs().get("minute");
    const top = `${(now / range) * 100}%`;
    setLineStyle({
      top,
      display:
        dayjs().format("YYYY-MM-DD") === dayjs(cRef.date).format("YYYY-MM-DD")
          ? "block"
          : "none",
    });
  }, [timeStar, timeEnd, cRef.date]);

  useEffect(() => {
    clearInterval(timer.current);
    calcTop();
    timer.current = window.setInterval(calcTop, 1000 * 60);
    () => {
      clearInterval(timer.current);
    };
  }, [timeStar, timeEnd, cRef.date]);

  return (
    <div className={Day}>
      {/** 背景层 */}
      <div className={TimeRow}>
        {cRef.dayRender?.[0]?.range.map((i) => (
          <div className={TimeRowItem} key={i.id}>
            {dayjs(i.startTimeStr).format("H")}
          </div>
        ))}
      </div>
      {cRef.dayRender?.[0]?.content.map((c) => (
        <div className={DayRow} key={c[0].colId}>
          {c.map((i) => (
            <div className={DayRowItem} key={i.id}></div>
          ))}
        </div>
      ))}
      <div className={NowLine} style={lineStyle}></div>
    </div>
  );
};
