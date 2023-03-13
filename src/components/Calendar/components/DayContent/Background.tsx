/*
 * @Author: liu7i
 * @Date: 2023-02-14 11:47:35
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-02-15 15:28:38
 */

import React, { useState, useEffect } from "react";
import type { ICalendarApi } from "components/Calendar";
import {
  DayRow,
  TimeRow,
  TimeRowItem,
  DayRowItem,
  NowLine,
  TimeRowItemTips,
  DayBg,
} from "./index.css";
import dayjs from "dayjs";
import { classNames } from "../../utils";

export interface IBackgroundProps {
  cRef: ICalendarApi;
  /** @param 开始时间（日-周模式）0-24 */
  timeStar: number;
  /** @param 结束时间（日-周模式） 0-24 需要大于timeStar 小于等于timeStar时无效 */
  timeEnd: number;
}

const Background = function Background_(props: IBackgroundProps) {
  const { cRef, timeStar, timeEnd } = props;
  const [lineStyle, setLineStyle] = useState<React.CSSProperties>({ top: "0" });
  const timer = React.useRef<number>(0);

  const calcTop = React.useCallback(() => {
    const range = (timeEnd - timeStar) * 60;
    const now = (dayjs().get("hour") - timeStar) * 60 + dayjs().get("minute");
    const top = `${(now / range) * 100}%`;

    let display = "block";

    if (
      dayjs().format("YYYY-MM-DD") !== dayjs(cRef.date).format("YYYY-MM-DD")
    ) {
      display = "none";
    }

    setLineStyle({
      top,
      display,
      zIndex: 999,
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
    <div
      className={DayBg}
      draggable={false}
      onDragStart={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {/** 背景线框层 */}
      <div className={TimeRow}>
        {cRef.dayRender?.[0]?.range.map((i) => (
          <div
            className={classNames({
              [TimeRowItem]: true,
              block: i.isRangeBlock,
            })}
            key={i.id}
            onMouseDown={(e) => {
              cRef.dayBgOptionWeb(i, e);
            }}
            onMouseMove={(e) => {
              cRef.dayBgOptionWeb(i, e);
            }}
            onMouseUp={(e) => {
              cRef.dayBgOptionWeb(i, e);
            }}
            onTouchStart={(e) => {
              cRef.dayBgOptionApp(i, e);
            }}
            onTouchMove={(e) => {
              cRef.dayBgOptionApp(i, e);
            }}
            onTouchEnd={(e) => {
              cRef.dayBgOptionApp(i, e);
            }}
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
              data-id={i.id}
              data-cid={i.colId}
              onMouseDown={(e) => {
                cRef.dayBgOptionWeb(i, e);
              }}
              onMouseMove={(e) => {
                cRef.dayBgOptionWeb(i, e);
                cRef.dayEventDrag({
                  e,
                  c: i,
                });
              }}
              onMouseUp={(e) => {
                cRef.dayBgOptionWeb(i, e);
                cRef.dayEventDrag({
                  e,
                  c: i,
                });
              }}
              onTouchStart={(e) => {
                cRef.dayBgOptionApp(i, e);
              }}
              onTouchMove={(e) => {
                cRef.dayBgOptionApp(i, e);
              }}
              onTouchEnd={(e) => {
                cRef.dayBgOptionApp(i, e);
              }}
            ></div>
          ))}
        </div>
      ))}
      <div
        className={NowLine}
        style={{
          ...lineStyle,
          display: cRef.dayRender[3].content.length
            ? "none"
            : lineStyle.display,
        }}
      ></div>
    </div>
  );
};

export default Background;
