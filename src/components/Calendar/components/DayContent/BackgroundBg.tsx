/*
 * @Author: liu7i
 * @Date: 2023-02-14 11:47:35
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-02-15 15:28:38
 */

import { DayRealBgContent, TimeRow, DayRealBg } from "./index.css";

const BackgroundBg = function BackgroundBg_() {
  return (
    <div className={DayRealBg}>
      {/** 背景层 */}
      <div className={TimeRow}></div>
      <div className={DayRealBgContent}></div>
    </div>
  );
};

export default BackgroundBg;
