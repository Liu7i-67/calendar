/*
 * @Author: liu7i
 * @Date: 2023-02-14 10:53:58
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-02-14 17:35:00
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
  DayBoxStyle,
  DayTitle,
  TitleTimeRow,
  TitleDayRow,
  TimeRowItemTips,
} from "./index.css";
import dayjs from "dayjs";
import { classNames } from "../../utils";
import type { EOptionType } from "components/Calendar/interface";

export interface IDayContentProps {
  cRef: ICalendarApi;
  /** @param 开始时间（日-周模式）0-24 */
  timeStar: number;
  /** @param 结束时间（日-周模式） 0-24 需要大于timeStar 小于等于timeStar时无效 */
  timeEnd: number;
}

export const DayContent = function DayContent_(props: IDayContentProps) {
  const { cRef, timeStar, timeEnd } = props;
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
    <div className={DayBoxStyle}>
      <div className={DayTitle}>
        <div className={TitleTimeRow}></div>
        {cRef.colItems.map((c) => (
          <div className={TitleDayRow} key={c.id}>
            {c.title}
          </div>
        ))}
      </div>
      <div className={Day}>
        {/** 背景层 */}
        <div className={TimeRow}>
          {cRef.dayRender?.[0]?.range.map((i) => (
            <div
              className={classNames({
                [TimeRowItem]: true,
                block: i.isRangeBlock,
              })}
              key={i.id}
            >
              {!i.isRangeBlock && (
                <>
                  {dayjs(i.startTimeStr).format("H")}
                  <span className={TimeRowItemTips}>00</span>
                </>
              )}
            </div>
          ))}
        </div>
        {cRef.dayRender?.[0]?.content.map((c) => (
          <div className={DayRow} key={c[0].colId}>
            {c.map((i) => (
              <div
                className={DayRowItem}
                key={i.id}
                onMouseDown={(e) => {
                  cRef.dayBgOption(i, e);
                }}
                onMouseMove={(e) => {
                  cRef.dayBgOption(i, e);
                }}
                onMouseUp={(e) => {
                  cRef.dayBgOption(i, e);
                }}
                onTouchStart={(e) => {
                  cRef.dayBgOption(i, e);
                }}
                onTouchMove={(e) => {
                  cRef.dayBgOption(i, e);
                }}
                onTouchEnd={(e) => {
                  cRef.dayBgOption(i, e);
                }}
              ></div>
            ))}
          </div>
        ))}
        <div className={NowLine} style={lineStyle}></div>
      </div>
    </div>
  );
};
