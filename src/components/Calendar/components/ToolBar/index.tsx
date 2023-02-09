/*
 * @Author: liu7i
 * @Date: 2023-01-20 16:27:47
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-02-09 11:35:26
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
  toolBarRight,
  toolBarRightBtnLeft,
  toolBarRightBtnRight,
} from "./index.css";
import { EView } from "../../interface";

export interface IToolBarProps {
  cRef: ICalendarApi;
  /** @function 工具栏右边可拓展部分*/
  rightExtra?: React.ReactNode;
}

export const ToolBar = function ToolBar_(props: IToolBarProps) {
  const { cRef } = props;
  return (
    <div className={toolBar}>
      <div className={toolBarLeft}>
        <i
          className={`iconfont icon-mjiantou-copy1 ${toolBarLeftBtn}`}
          onClick={() => {
            cRef.backDate();
          }}
        />
        <span className={toolBarLeftTitle}>
          {dayjs(cRef.date).format("YYYY年 MM月DD日")}（
          {
            cnWeekDay[
              +dayjs(cRef.date).format("d") as 0 | 1 | 2 | 3 | 4 | 5 | 6
            ]
          }
          ）
        </span>
        <i
          className={`iconfont icon-mjiantou-copy ${toolBarLeftBtn}`}
          onClick={() => {
            cRef.nextDate();
          }}
        />
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
      <div className={toolBarRight}>
        {props.rightExtra}
        {cRef.view.type === EView.DAY && (
          <>
            <i
              className={`iconfont icon-zuixiaohua-copy ${toolBarRightBtnLeft}`}
            />
            <i className={`iconfont icon-plus ${toolBarRightBtnRight}`} />
          </>
        )}
      </div>
    </div>
  );
};
