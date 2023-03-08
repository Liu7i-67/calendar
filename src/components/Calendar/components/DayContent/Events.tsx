/*
 * @Author: liu7i
 * @Date: 2023-03-08 10:07:55
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-03-08 11:20:08
 */

import {
  EventRowItem,
  EventsTimeRow,
  EventsBg,
  EventMarkRow,
} from "./index.css";
import type { ICalendarApi } from "components/Calendar";

export interface IBackgroundProps {
  cRef: ICalendarApi;
}

const Events = function Events_(props: IBackgroundProps) {
  const { cRef } = props;

  console.log("cRef:", cRef?.dayRender?.[2]);

  return (
    <div className={EventsBg}>
      {/** 事件层 */}
      <div className={EventsTimeRow}></div>
      {cRef.dayRender?.[2]?.content.map((c, cIndex) => (
        <div className={EventMarkRow} key={cIndex}>
          {c?.showEvent?.map((i, index) => (
            <div
              className={EventRowItem}
              key={`${cIndex}+${index}`}
              style={i.style}
            >
              {i.title}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Events;
