/*
 * @Author: liu7i
 * @Date: 2023-02-17 09:54:53
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-02-17 10:24:09
 */

export class DHelper {
  /** @param 日期对象 */
  readonly d: Date;
  /** @param 日期时间戳 */
  readonly _d: number;
  constructor(d: Date) {
    this.d = d;
    this._d = d.getTime();
  }

  /**
   * @function 从日期对象中获取对应的字符串
   * @param option 参考dayjs or moment.js YYYY / MM / DD / d / HH / mm / ss
   * @returns string
   */
  format(option: string) {
    const newDate = new Date(this.d);
    let str = option;
    str = str.replace("YYYY", `${newDate.getFullYear()}`);
    if (str.indexOf("MM") > -1) {
      str = str.replace("MM", `0${newDate.getMonth() + 1}`.padStart(2, "0"));
    } else if (str.indexOf("M") > -1) {
      str = str.replace("M", `${newDate.getMonth() + 1}`);
    }
    if (str.indexOf("DD") > -1) {
      str = str.replace("DD", `${newDate.getDate()}`.padStart(2, "0"));
    } else if (str.indexOf("D") > -1) {
      str = str.replace("D", `${newDate.getDate()}`);
    }
    if (str.indexOf("d") > -1) {
      str = str.replace("d", `${newDate.getDay()}`);
    }
    if (str.indexOf("hh") > -1) {
      str = str.replace("hh", `0${newDate.getHours()}`.padStart(2, "0"));
    } else if (str.indexOf("h") > -1) {
      str = str.replace("h", `${newDate.getHours()}`);
    }
    if (str.indexOf("mm") > -1) {
      str = str.replace("mm", `0${newDate.getMinutes()}`.padStart(2, "0"));
    } else if (str.indexOf("m") > -1) {
      str = str.replace("m", `${newDate.getMinutes()}`);
    }
    if (str.indexOf("ss") > -1) {
      str = str.replace("ss", `0${newDate.getSeconds()}`.padStart(2, "0"));
    } else if (str.indexOf("s") > -1) {
      str = str.replace("s", `${newDate.getSeconds()}`);
    }
    return str;
  }

  /**
   * @function 减少多少时间
   * @param num 数目
   * @param option 单位
   * @returns DH
   */
  reduce(num: number, option: "day") {
    if (!num) {
      return DH(new Date(this.d));
    }

    switch (option) {
      case "day": {
        return DH(new Date(this._d - 1000 * 60 * 60 * 24 * num));
      }
    }
  }

  /** @function 获取Date对象 */
  toDate() {
    return this.d;
  }
}

export const DH = (date?: Date | string | number) => {
  switch (typeof date) {
    case "undefined": {
      return new DHelper(new Date());
    }
  }
  return new DHelper(new Date(date));
};
