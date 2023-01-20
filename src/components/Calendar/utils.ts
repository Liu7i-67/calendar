/*
 * @Author: liu7i
 * @Date: 2023-01-20 17:18:22
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-01-20 17:30:21
 */

import { EView, IView } from "./interface";

export const cnWeekDay = {
  0: "周日",
  1: "周一",
  2: "周二",
  3: "周三",
  4: "周四",
  5: "周五",
  6: "周六",
};

export const getNowTitle = (data: Date, view: IView) => {
  switch (view.type) {
    case EView.DAY: {
      return;
    }
  }
};
