/*
 * @Author: liu7i
 * @Date: 2023-02-15 15:35:14
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-02-15 16:11:18
 */

import React, { useState, useEffect } from "react";
import type { ICalendarApi } from "components/Calendar";
import {
  DayRow,
  TimeRow,
  TimeRowItem,
  DayRowItem,
  DragDayRow,
  DragTimeRowItem,
  DragStyle,
  DragDayRowItem,
} from "./index.css";
import dayjs from "dayjs";
import { classNames } from "../../utils";

export interface IDragProps {
  cRef: ICalendarApi;
}

const Drag = function Drag_(props: IDragProps) {
  const { cRef } = props;

  // console.log("cRef?.dayRender:", cRef?.dayRender);

  return (
    <div className={DragStyle}>
      {/** 背景层 */}
      <div className={TimeRow}>
        {cRef?.dayRender?.[1]?.range?.map?.((i) => (
          <div
            className={classNames({
              [DragTimeRowItem]: true,
              block: i.isRangeBlock,
            })}
            key={i.id}
            style={i.style}
          ></div>
        ))}
      </div>
      {cRef?.dayRender?.[1]?.content?.map?.((c, cIndex) => {
        return (
          <div className={DragDayRow} key={`${cIndex}-${c?.[0]?.colId}`}>
            {c?.map?.((i) => (
              <div className={DragDayRowItem} key={i.id} style={i.style}></div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default Drag;
