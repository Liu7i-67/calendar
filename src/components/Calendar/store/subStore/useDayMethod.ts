/*
 * @Author: liu7i
 * @Date: 2023-02-14 18:15:58
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-02-17 11:50:09
 */

import type { IEventCol } from "components/Calendar/interface";
import { useMethods } from "@quarkunlimit/react-hooks";
import {
  IDragEvent,
  ISubRootProps,
  EOptionTypeWeb,
  EOptionTypeApp,
} from "components/Calendar/interface";
import { getSEInfo, DH } from "components/Calendar/utils";
import { cloneDeep } from "lodash";

export const useDayMethod = (_props: ISubRootProps) => {
  const { data, setData, props } = _props;

  const _methods = useMethods({
    /** @function 日模式背景相关操作-WEB端 */
    dayBgOptionWeb(c: IEventCol, e: React.MouseEvent<HTMLDivElement>) {
      if (!data.isWeb) {
        return;
      }

      switch (e.type) {
        case EOptionTypeWeb.MOUSEDOWN:
          {
            setData((o) => {
              o.temDragData[0] = {
                type: e.type as EOptionTypeWeb,
                x: e?.clientX,
                y: e?.clientY,
                col: c,
                time: Date.now(),
              };
            });
          }
          break;
        case EOptionTypeWeb.MOUSEMOVE:
          {
            setData((o) => {
              if (!o.temDragData[0]) {
                return;
              }
              o.temDragData[1] = {
                type: e.type as EOptionTypeWeb,
                x: e?.clientX,
                y: e?.clientY,
                col: c,
                time: Date.now(),
              };
            });
          }
          break;
        case EOptionTypeWeb.MOUSEUP:
          {
            setData((o) => {
              if (!o.temDragData[0]) {
                return;
              }
              o.temDragData[1] = {
                type: e.type as EOptionTypeWeb,
                x: e?.clientX,
                y: e?.clientY,
                col: c,
                time: Date.now(),
              };

              const res = getSEInfo(o.temDragData);

              props.onEventAdd?.({
                startTime: res.start.startTimeStr,
                endTime: res.end.endTimeStr,
                colId: res.colId,
              });

              o.temDragData.splice(0, 2);
            });
          }
          break;
      }
    },
    /** @function 日模式背景相关操作-移动端 */
    dayBgOptionApp(c: IEventCol, e: React.TouchEvent<HTMLDivElement>) {
      if (data.isWeb) {
        setData((o) => {
          o.isWeb = false;
        });
      }

      switch (e.type) {
        case EOptionTypeApp.TOUCHSTART:
          {
            const newTempData: IDragEvent = {
              type: e.type as EOptionTypeApp,
              col: c,
              time: Date.now(),
            };

            // 判断当前开关是否已打开
            if (data.appDragFlag) {
              // 是否准备结束
              if (data.touchData[0]) {
                // 拖动操作结束
                if (Date.now() - data.touchData[0].time < data.touchInterval) {
                  const res = getSEInfo(data.temDragData as IDragEvent[]);

                  props.onEventAdd?.({
                    startTime: res.start.startTimeStr,
                    endTime: res.end.endTimeStr,
                    colId: res.colId,
                  });

                  setData((o) => {
                    o.appDragFlag = false;
                    o.temDragData.splice(0, 2);
                    o.touchData.splice(0, 2);
                  });
                  return;
                }
                // 清空之前准备结束的操作记录
                setData((o) => {
                  o.touchData.splice(0, 2);
                  o.touchData[0] = newTempData;
                });
                return;
              }
              // 记录准备结束的操作信息
              setData((o) => {
                o.touchData[0] = newTempData;
              });
              return;
            }

            // 判断是否需要打开开关
            if (data.touchData[0]) {
              if (Date.now() - data.touchData[0].time < data.touchInterval) {
                setData((o) => {
                  o.appDragFlag = true;
                  o.touchData.splice(0, 2);
                  o.temDragData.splice(0, 2);
                  o.temDragData[0] = newTempData;
                });
                return;
              }
              // 重置打开开关的尝试
              setData((o) => {
                o.touchData[0] = newTempData;
              });

              return;
            }
            setData((o) => {
              o.touchData[0] = newTempData;
            });
          }
          break;
        case EOptionTypeApp.TOUCHMOVE:
          {
            if (!data.appDragFlag) {
              return;
            }
            const newTempData: IDragEvent = {
              type: e.type as EOptionTypeApp,
              col: c,
              time: Date.now(),
            };
            setData((o) => {
              o.temDragData[1] = newTempData;
            });
          }
          break;
        case EOptionTypeApp.TOUCHEND:
          {
          }
          break;
      }
    },
  });

  return _methods;
};
