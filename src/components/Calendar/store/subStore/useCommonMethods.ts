/*
 * @Author: liu7i
 * @Date: 2023-02-14 16:58:37
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-02-16 16:34:44
 */
import type { IView } from "components/Calendar/interface";
import { useMethods } from "@quarkunlimit/react-hooks";
import { EView, ISubRootProps } from "components/Calendar/interface";
import dayjs from "dayjs";

export const useCommonMethods = (_props: ISubRootProps) => {
  const { data, setData, props } = _props;

  const _methods = useMethods({
    /** @function 改变当前激活的日历模式 */
    changeView: (v: IView) => {
      setData((o) => {
        o.view = v;
        props.onViewChange?.(o.view);
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
    /** @function 回到现在 */
    backToNow: (newDate?: Date) => {
      if (newDate) {
        setData((o) => {
          o.date = newDate;
        });
        return;
      }
      setData((o) => {
        o.date = new Date();
      });
    },
    /** @function 展示下一页专家信息 */
    nextColItems: () => {
      setData((o) => {
        if (o.index * o.pageSize - 2 < (props.colItems?.length ?? 0)) {
          o.index = o.index + 1;
        }
      });
    },
    /** @function 展示上一页专家信息 */
    preColItems: () => {
      setData((o) => {
        let nextIndex = o.index - 1;
        if (nextIndex < 1) {
          nextIndex = 1;
        }

        o.index = nextIndex;
      });
    },
  });

  return _methods;
};
