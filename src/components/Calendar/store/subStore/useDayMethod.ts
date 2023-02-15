/*
 * @Author: liu7i
 * @Date: 2023-02-14 18:15:58
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-02-15 16:10:42
 */

import type { IEventCol } from "components/Calendar/interface";
import { useMethods } from "@quarkunlimit/react-hooks";
import {
  IDragEvent,
  ISubRootProps,
  EOptionTypeWeb,
  EOptionTypeApp,
} from "components/Calendar/interface";
import cloneDeep from "lodash/cloneDeep";

export const useDayMethod = (_props: ISubRootProps) => {
  const { data, setData, props } = _props;

  const _methods = useMethods({
    /** @function 日模式背景相关操作-WEB端 */
    dayBgOptionWeb(c: IEventCol, e: React.MouseEvent<HTMLDivElement>) {
      if (data?.temDragData?.[0]?.type === EOptionTypeApp.TOUCHSTART) {
        console.log("这是移动端，不走web逻辑");
        return;
      }

      if (data?.touchData?.[0]?.type === EOptionTypeApp.TOUCHSTART) {
        console.log("这是移动端，不走web逻辑");
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
              console.log("---temDragData:", cloneDeep(o.temDragData));
              o.temDragData[1] = {
                type: e.type as EOptionTypeWeb,
                x: e?.clientX,
                y: e?.clientY,
                col: c,
                time: Date.now(),
              };
              console.log("temDragData:", cloneDeep(o.temDragData));
              o.temDragData.splice(0, 2);
            });
          }
          break;
      }
    },
    /** @function 日模式背景相关操作-移动端 */
    dayBgOptionApp(c: IEventCol, e: React.TouchEvent<HTMLDivElement>) {
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
                  setData((o) => {
                    console.log(
                      "拖动操作完成----起始点：",
                      cloneDeep(data.temDragData[0]),
                      "----结束点：",
                      newTempData
                    );
                    o.appDragFlag = false;
                    o.temDragData.splice(0, 2);
                    o.touchData.splice(0, 2);
                  });
                  return;
                }
                // 清空之前准备结束的操作记录
                console.log("1----清空之前准备结束的操作记录");
                setData((o) => {
                  o.touchData.splice(0, 2);
                  o.touchData[0] = newTempData;
                });
                return;
              }
              // 记录准备结束的操作信息
              console.log("2----清空之前准备结束的操作记录");
              setData((o) => {
                o.touchData[0] = newTempData;
              });
              return;
            }

            // 判断是否需要打开开关
            if (data.touchData[0]) {
              if (Date.now() - data.touchData[0].time < data.touchInterval) {
                console.log("3----打开开关");
                setData((o) => {
                  o.appDragFlag = true;
                  o.touchData.splice(0, 2);
                  o.temDragData.splice(0, 2);
                  o.temDragData[0] = newTempData;
                });
                return;
              }
              // 重置打开开关的尝试
              console.log("4----重置打开开关的尝试");
              setData((o) => {
                o.touchData[0] = newTempData;
              });

              return;
            }
            console.log("5----打开开关的尝试");
            setData((o) => {
              o.touchData[0] = newTempData;
            });

            console.log(e.type, "---", e);
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
            // if (!data.temDragData[0]) {
            //   return;
            // }
            // if (Date.now() - data.temDragData[0].time < data.touchInterval) {
            //   console.log("很短");
            //   return;
            // }
            // console.log(e.type, "---", e);
            // // 找到移动结束时的节点信息
            // var event = e || window.event;
            // var element = document.elementFromPoint(
            //   event.changedTouches[0].pageX,
            //   event.changedTouches[0].pageY
            // ) as HTMLDivElement;
            // if (element) {
            //   const id = element.dataset.id;
            //   const cid = element.dataset.cid;
            //   console.log("0", cloneDeep(data.temDragData?.[0]));
            //   console.log("1", element.dataset);
            //   console.log("准备新增: ");
            // }
            // setData((o) => {
            //   // 清空临时数据
            //   o.temDragData.splice(0, 2);
            // });
          }
          break;
      }
    },
  });

  return _methods;
};
