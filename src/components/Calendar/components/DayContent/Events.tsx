/*
 * @Author: liu7i
 * @Date: 2023-03-08 10:07:55
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-03-10 14:34:56
 */

import {
  EventRowItem,
  EventsTimeRow,
  EventsBg,
  EventMarkRow,
  EventRowMore,
  EventRowMoreContent,
  EventRowMoreContentDot,
  EventRowMoreBox,
  EventRowMoreItem,
} from "./index.css";
import type { ICalendarApi } from "components/Calendar";
import { classNames } from "../../utils";
import { useClickPreventionOnDoubleClick } from "hooks/useClickPreventionOnDoubleClick";

export interface IBackgroundProps {
  cRef: ICalendarApi;
}

const Events = function Events_(props: IBackgroundProps) {
  const { cRef } = props;
  const [click, doubleClick] = useClickPreventionOnDoubleClick(
    cRef.eventClick as Function,
    cRef.eventDoubleClick as Function
  );

  return (
    <div className={EventsBg}>
      {/** 事件层 */}
      <div className={EventsTimeRow}></div>
      {cRef.dayRender?.[2]?.content.map((c, cIndex) => (
        <div className={EventMarkRow} key={cIndex}>
          {c?.showEvent?.map((i, index) => (
            <div
              className={classNames({
                [EventRowItem]: true,
                transparent: cRef?.dayRender?.[3]?.dragging,
              })}
              key={`${cIndex}-${index}`}
              style={i.style}
              onClick={() => click?.(i)}
              onDoubleClick={() => doubleClick?.(i)}
              onMouseDown={(e) => {
                cRef.dayEventDrag({
                  e,
                  et: i,
                });
              }}
              onMouseMove={(e) => {
                cRef.clearTimeDelay(e);
                // console.log("move:", e);
              }}
            >
              {i.title}
            </div>
          ))}
          {c?.moreInfo?.map((i, index) => (
            <div
              className={classNames({
                [EventRowMore]: true,
                transparent: cRef?.dayRender?.[3]?.dragging,
              })}
              key={`${cIndex}-${index}-more`}
              style={i.style}
            >
              <div className={EventRowMoreContent}>
                <div className={EventRowMoreContentDot}></div>
                <div className={EventRowMoreContentDot}></div>
                <div className={EventRowMoreContentDot}></div>
              </div>
              <div
                className={classNames({
                  [EventRowMoreBox]: true,
                  pop: true,
                })}
              >
                {i.moreEvent?.map((e) => (
                  <div key={e.id} className={EventRowMoreItem}>
                    {e.title}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Events;
