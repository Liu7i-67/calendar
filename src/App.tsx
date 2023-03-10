/*
 * @Author: liu7i
 * @Date: 2023-01-20 16:00:33
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-03-01 14:34:10
 */
import { useState, useMemo } from "react";
import Calendar, {
  themeClass,
  ErrorBoundary,
  Button,
  ToolBar,
  Dropdown,
  DayContent,
  EView,
  IColItem,
  removeRepeat,
  DH,
  IMaskEvent,
  getRangeComplementarySet,
  IEvent,
} from "components/Calendar";
import dayjs from "dayjs";
import "./App.css";
import { dayData } from "./mock";

const rightExtra = [
  {
    key: "1",
    node: <Button className="primary_btn mr-8">预约申请</Button>,
  },
  {
    key: "11",
    node: <Button className="primary_btn mr-8">预约申请处理</Button>,
  },
  {
    key: "111",
    node: <Button className="mr-8">查看排程</Button>,
  },
  {
    key: "1111",
    node: <Button className="mr-8">查看排班</Button>,
  },
];

const events = [
  {
    id: "1",
    colId: "2",
    startTimeStr: "2023-02-14 9:00",
    endTimeStr: "2023-02-14 10:00",
    title: "过",
  },
];

function App() {
  const [state, setState] = useState({ type: EView.DAY, title: "日" });

  const colItems = useMemo(() => {
    switch (state.type) {
      case EView.DAY: {
        const arr = removeRepeat(
          dayData.data.expert.map((i) => {
            return {
              ...i,
              id: i.value,
              title: i.label,
            } as IColItem;
          }),
          "id"
        );
        return arr;
      }
      default: {
        const i = dayData.data.expert[0];
        return [
          {
            ...i,
            id: i.value,
            title: i.label,
          } as IColItem,
        ];
      }
    }
  }, []);

  const event = useMemo(() => {
    const a: IEvent[] = dayData.data.event.map((i) => {
      return {
        ...i,
        colId: i.doctor_id,
        startTimeStr: i.start_date,
        endTimeStr: i.end_date,
        title: i.customerName,
      } as IEvent;
    });
    return a;
  }, []);

  const maskEvents = useMemo(() => {
    const _maskEvents: IMaskEvent[] = [];

    const dateStr = dayjs().format("YYYY-MM-DD");
    colItems.forEach((c) => {
      const ableTime =
        dayData.data.ableTime.filter((i) => i.expertId === c.id) || [];

      const range = getRangeComplementarySet(ableTime, dateStr);
      _maskEvents.push(
        ...((range.map((i) => ({
          startTimeStr: i?.startDate,
          endTimeStr: i?.endDate,
          colId: c.id,
        })) as IMaskEvent[]) || [])
      );
    });
    return _maskEvents;
  }, [colItems]);

  const timeStar = 9;
  const timeEnd = 22;

  return (
    <div className="App">
      <ErrorBoundary>
        <Calendar
          events={event}
          maskEvents={maskEvents}
          colItems={colItems}
          timeStar={timeStar}
          timeEnd={timeEnd}
          defaultDate={new Date("2023-03-07")}
          timeRange={15}
          onViewChange={(v) => {
            setState(v);
          }}
          onEventAdd={(c) => {
            console.log("新建预约:", c);
          }}
          eventClick={(e) => {
            console.log("打开详情：", e);
          }}
          eventDoubleClick={(e) => {
            console.log("打开编辑:", e);
          }}
          onEventDrag={(req) => {
            console.log("事件拖拽：", req);
          }}
          maxCellEventNumber={5}
        >
          {(ref) => {
            return (
              <div className={themeClass}>
                {dayjs(ref.date).format("YYYY-MM-DD")}
                <ToolBar cRef={ref} rightExtra={rightExtra} />
                {ref.view.type === EView.DAY && (
                  <DayContent
                    cRef={ref}
                    timeStar={timeStar}
                    timeEnd={timeEnd}
                  />
                )}
                <div>当前展示的视图为：{ref.view.title}视图</div>
              </div>
            );
          }}
        </Calendar>
      </ErrorBoundary>
    </div>
  );
}

export default App;
