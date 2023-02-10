/*
 * @Author: liu7i
 * @Date: 2023-01-20 16:27:47
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-02-10 10:53:16
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
  toolBarBackTodayBtn,
} from "./index.css";
import { EView } from "../../interface";
import {
  getNowTitle,
  backToNowInfo,
  classNames,
} from "components/Calendar/utils";

export interface IToolBarProps {
  cRef: ICalendarApi;
  /** @function 工具栏右边可拓展部分*/
  rightExtra?: React.ReactNode;
  /** @function 其它模式的标题渲染 */
  otherTitle?: () => string;
  /** @function 其它模式控制返回现在按钮是否显示已经其文本 */
  otherInfo?: () => { title: string; show: boolean; newDate?: Date };
}

export const ToolBar = function ToolBar_(props: IToolBarProps) {
  const { cRef } = props;

  const title = React.useMemo(() => {
    return getNowTitle(cRef.date, cRef.view, props.otherTitle);
  }, [cRef.date, cRef.view, props.otherTitle]);

  const backInfo = React.useMemo(() => {
    return backToNowInfo(cRef.date, cRef.view, props.otherInfo);
  }, [cRef.date, cRef.view, props.otherInfo]);

  return (
    <div className={toolBar}>
      <div className={toolBarLeft}>
        <i
          className={`iconfont icon-mjiantou-copy1 ${toolBarLeftBtn}`}
          onClick={() => {
            cRef.backDate();
          }}
        />
        <span className={toolBarLeftTitle}>{title}</span>
        <i
          className={`iconfont icon-mjiantou-copy ${toolBarLeftBtn}`}
          onClick={() => {
            cRef.nextDate();
          }}
        />
        <button
          type="button"
          className={classNames({
            [toolBarBackTodayBtn]: true,
            show: backInfo.show,
          })}
          onClick={() => {
            cRef.backToNow();
          }}
        >
          {backInfo.title}
        </button>
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
