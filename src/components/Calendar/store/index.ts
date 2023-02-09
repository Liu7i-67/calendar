/*
 * @Author: liu7i
 * @Date: 2023-02-09 11:20:27
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-02-09 13:38:32
 */
import { useCallback, useMemo } from "react";
import { useImmer } from "@quarkunlimit/immer";
import { createStore } from "@quarkunlimit/tiny";
import { useMethods, useMount } from "@quarkunlimit/react-hooks";
import type { ICalendarProps, IStore, IView } from "../interface";
import { EView } from "../interface";
import dayjs from "dayjs";

const initViews: IView[] = [
  { type: EView.DAY, title: "日" },
  { type: EView.WEEK, title: "周" },
  { type: EView.MONTH, title: "月" },
  { type: EView.YEAR, title: "年" },
];

export function useStore(props: ICalendarProps) {
  const [data, setData] = useImmer<IStore>({
    date: props.defaultDate || new Date(),
    views: props.views || initViews,
    view: props.defaultView || (props.views || initViews)[0],
  });

  useMount(() => {
    console.log("挂载时Props：", props);
  });

  const backDate = useCallback(() => {}, []);

  const methods = useMethods({
    /** @function 改变当前激活的日历模式 */
    changeView: (v: IView) => {
      setData((o) => {
        o.view = v;
      });
    },
    /** @function 向前调整日期 */
    backDate: (newDate?: Date) => {
      if (newDate) {
        setData((o) => {
          o.date = newDate;
        });
        return;
      }

      let oldDate = data.date;
      let unit: dayjs.ManipulateType = "day";

      switch (data.view.type) {
        case EView.DAY:
          {
            unit = "day";
          }
          break;
        case EView.WEEK:
          {
            unit = "week";
          }
          break;
        case EView.MONTH:
          {
            unit = "month";
          }
          break;
        case EView.YEAR: {
          unit = "year";
        }
      }
      setData((o) => {
        o.date = dayjs(oldDate).subtract(1, unit).toDate();
      });
    },
    /** @function 向后调整日期 */
    nextDate: (newDate?: Date) => {
      if (newDate) {
        setData((o) => {
          o.date = newDate;
        });
        return;
      }

      let oldDate = data.date;
      let unit: dayjs.ManipulateType = "day";

      switch (data.view.type) {
        case EView.DAY:
          {
            unit = "day";
          }
          break;
        case EView.WEEK:
          {
            unit = "week";
          }
          break;
        case EView.MONTH:
          {
            unit = "month";
          }
          break;
        case EView.YEAR: {
          unit = "year";
        }
      }
      setData((o) => {
        o.date = dayjs(oldDate).add(1, unit).toDate();
      });
    },
  });

  const computed = useMemo(() => {
    return {
      options: [],
      value: {},
    };
  }, []);

  return {
    props,
    data: data as IStore,
    methods,
    computed,
  };
}

export const RootStore = createStore(useStore);
