/*
 * @Author: liu7i
 * @Date: 2023-01-20 16:00:33
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-02-08 11:29:39
 */
import Calendar, { themeClass } from "components/Calendar";
import ToolBar from "components/Calendar/components/ToolBar";
import dayjs from "dayjs";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Calendar>
        {(ref) => {
          return (
            <div className={themeClass}>
              {dayjs(ref.date).format("YYYY-MM-DD")}
              <ToolBar cRef={ref} />
              <div>当前展示的视图为：{ref.view.title}视图</div>
            </div>
          );
        }}
      </Calendar>
    </div>
  );
}

export default App;
