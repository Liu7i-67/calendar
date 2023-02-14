/*
 * @Author: liu7i
 * @Date: 2023-02-14 18:15:58
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-02-14 18:35:57
 */

import type { IEventCol } from "components/Calendar/interface";
import { useMethods } from "@quarkunlimit/react-hooks";
import { EOptionType, ISubRootProps } from "components/Calendar/interface";
import dayjs from "dayjs";

export const useDayMethod = (props: ISubRootProps) => {
  const { data, setData } = props;

  const _methods = useMethods({
    /** @function 日模式背景相关操作 */
    dayBgOption(
      c: IEventCol,
      e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
    ) {
      switch (e.type) {
        case EOptionType.mousedown:
        case EOptionType.touchstart:
          {
            setData((o) => {
              // o.temDragData.push({
              //   type:e.type as EOptionType,
              // })
            });
            console.log(c, e);
          }
          break;
      }
    },
  });

  return _methods;
};
