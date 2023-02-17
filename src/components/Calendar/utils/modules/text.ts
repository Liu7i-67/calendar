/*
 * @Author: liu7i
 * @Date: 2023-02-17 09:41:36
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-02-17 10:06:30
 */
import { EView, IView } from "../../interface";
import dayjs from "dayjs";
import { cnMonth, cnWeekDay, DH } from "../index";

export const getNowTitle = (
  date: Date,
  view: IView,
  otherTitle?: () => string
) => {
  let title = "";
  switch (view.type) {
    case EView.DAY:
      {
        title = `${DH(date).format("YYYY年 MM月DD日")} (${
          cnWeekDay[+DH(date).format("d") as 0 | 1 | 2 | 3 | 4 | 5 | 6]
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
