/*
 * @Author: liu7i
 * @Date: 2023-01-20 16:00:33
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-02-08 14:44:46
 */
import Calendar, { themeClass } from "components/Calendar";
import ErrorBoundary from "components/Calendar/components/ErrorBoundary";
import Button from "components/Calendar/components/Button";
import ToolBar from "components/Calendar/components/ToolBar";
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
                  rightExtra={
                    <>
                      <Button className="primary_btn mr-8">预约申请</Button>
                      <Button className="primary_btn mr-8">预约申请处理</Button>
                      <Button className="mr-8">查看排程</Button>
                      <Button className="mr-8">查看排班</Button>
                    </>
                  }
                />
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
