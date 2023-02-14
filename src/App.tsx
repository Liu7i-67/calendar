/*
 * @Author: liu7i
 * @Date: 2023-01-20 16:00:33
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-02-14 16:05:04
 */
import Calendar, {
  themeClass,
  ErrorBoundary,
  Button,
  ToolBar,
  Dropdown,
  DayContent,
  EView,
} from "components/Calendar";
import dayjs from "dayjs";
import "./App.css";

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

const cols = [
  {
    id: "1",
    title: "张三",
  },
  {
    id: "2",
    title: "李四",
  },
  {
    id: "3",
    title: "王五",
  },
  {
    id: "4",
    title: "赵二",
  },
];

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <Calendar
          events={events}
          colItems={cols}
          timeStar={8}
          timeEnd={22}
          timeRange={15}
        >
          {(ref) => {
            return (
              <div className={themeClass}>
                {dayjs(ref.date).format("YYYY-MM-DD")}
                <ToolBar cRef={ref} rightExtra={rightExtra} />
                {ref.view.type === EView.DAY && (
                  <DayContent cRef={ref} timeStar={8} timeEnd={22} />
                )}
                <div>当前展示的视图为：{ref.view.title}视图</div>
              </div>
            );
          }}
        </Calendar>
        <Dropdown
          content={[
            {
              key: "add",
              node: <div>新增</div>,
            },
            {
              key: "edit",
              node: <div>编辑</div>,
            },
          ]}
        >
          操作
        </Dropdown>
      </ErrorBoundary>
    </div>
  );
}

export default App;
