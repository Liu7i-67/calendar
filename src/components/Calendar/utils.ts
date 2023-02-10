/*
 * @Author: liu7i
 * @Date: 2023-01-20 17:18:22
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-02-10 10:52:12
 */

import { EView, IView } from "./interface";
import dayjs from "dayjs";

export const classNames = (obj: { [key: string]: boolean }) => {
  let className = "";
  Object.keys(obj).forEach((i) => {
    // @ts-ignore
    if (obj[i] as boolean) {
      className += `${i} `;
    }
  });
  return className;
};

export const cnWeekDay = {
  0: "周日",
  1: "周一",
  2: "周二",
  3: "周三",
  4: "周四",
  5: "周五",
  6: "周六",
};

export const cnMonth = [
  "一月",
  "二月",
  "三月",
  "四月",
  "五月",
  "六月",
  "七月",
  "八月",
  "九月",
  "十月",
  "十一月",
  "十二月",
];

export const getNowTitle = (
  date: Date,
  view: IView,
  otherTitle?: () => string
) => {
  let title = "";
  switch (view.type) {
    case EView.DAY:
      {
        title = `${dayjs(date).format("YYYY年 MM月DD日")} (${
          cnWeekDay[+dayjs(date).format("d") as 0 | 1 | 2 | 3 | 4 | 5 | 6]
        }) `;
      }
      break;
    case EView.WEEK:
      {
        const first = dayjs(date).startOf("week");
        const end = dayjs(date).startOf("week").add(6, "days");
        title = `${first.format("YYYY年 MM月DD日")} — ${end.format(
          "YYYY年 MM月DD日"
        )}`;
      }
      break;
    case EView.MONTH:
      {
        title = `${cnMonth[+dayjs(date).format("M") - 1]} ${dayjs(date).format(
          "YYYY"
        )}`;
      }
      break;
    case EView.YEAR:
      {
        title = `${dayjs(date).format("YYYY")}年`;
      }
      break;
    default: {
      if (otherTitle) {
        title = otherTitle();
      }
    }
  }
  return title;
};

export const backToNowInfo = (
  date: Date,
  view: IView,
  otherInfo?: () => { title: string; show: boolean; newDate?: Date }
) => {
  const res = {
    title: "",
    show: false,
    newDate: undefined as Date | undefined,
  };

  const nowStr = dayjs().format("YYYY-MM-DD");

  switch (view.type) {
    case EView.DAY:
      {
        res.title = "回到今天";
        res.show = dayjs(date).format("YYYY-MM-DD") !== nowStr;
      }
      break;
    case EView.WEEK:
      {
        const start = dayjs(date).startOf("week");
        const end = dayjs(date).startOf("week").add(6, "days");
        res.title = "回到本周";
        if (start.isAfter(nowStr) || end.isBefore(nowStr)) {
          res.show = true;
        }
      }
      break;
    case EView.MONTH:
      {
        res.title = "回到本月";
        res.show = dayjs(date).format("YYYY-MM") !== dayjs().format("YYYY-MM");
      }
      break;
    case EView.YEAR:
      {
        res.title = "回到本年";
        res.show = !dayjs(date).isSame(nowStr, "year");
      }
      break;
    default: {
      if (otherInfo) {
        const other = otherInfo();
        res.title = other.title;
        res.newDate = other.newDate;
        res.show = other.show;
      }
    }
  }

  return res;
};
