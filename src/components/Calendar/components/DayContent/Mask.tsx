/*
 * @Author: liu7i
 * @Date: 2023-02-14 11:47:35
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-02-15 15:28:38
 */

import React, { useState, useEffect } from "react";
import type { ICalendarApi } from "components/Calendar";
import {
  MarkRow,
  TimeRow,
  TimeRowItem,
  DayRowItem,
  NowLine,
  TimeRowItemTips,
  MarkBg,
  MarkRowItem,
} from "./index.css";
import dayjs from "dayjs";
import { classNames } from "../../utils";

export interface IMaskProps {
  cRef: ICalendarApi;
}

const Mask = function Mask_(props: IMaskProps) {
  const { cRef } = props;

  console.log("cRef.dayRender?.[1]:", cRef.dayRender?.[1]);

  return (
    <div
      className={MarkBg}
      draggable={false}
      onDragStart={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {/** 遮罩层 */}
      <div className={TimeRow}></div>
      {cRef.dayRender?.[1]?.content.map((c, cIndex) => (
        <div className={MarkRow} key={cIndex}>
          {c.map((i, index) => (
            <div
              className={MarkRowItem}
              key={`${cIndex}+${index}`}
              style={i.style}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Mask;
