/*
 * @Author: liu7i
 * @Date: 2023-01-20 16:00:33
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-02-10 11:34:22
 */
import Calendar, {
  themeClass,
  ErrorBoundary,
  Button,
  ToolBar,
  Dropdown,
} from "components/Calendar";
import dayjs from "dayjs";
import "./App.css";

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <Calendar>
          {(ref) => {
            return (
              <div className={themeClass}>
                {dayjs(ref.date).format("YYYY-MM-DD")}
                <ToolBar
                  cRef={ref}
                  rightExtra={[
                    {
                      key: "1",
                      node: (
                        <Button className="primary_btn mr-8">预约申请</Button>
                      ),
                    },
                    {
                      key: "11",
                      node: (
                        <Button className="primary_btn mr-8">
                          预约申请处理
                        </Button>
                      ),
                    },
                    {
                      key: "111",
                      node: <Button className="mr-8">查看排程</Button>,
                    },
                    {
                      key: "1111",
                      node: <Button className="mr-8">查看排班</Button>,
                    },
                  ]}
                />
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
