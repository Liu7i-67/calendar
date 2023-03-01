/*
 * @Author: liu7i
 * @Date: 2023-03-01 14:29:17
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-03-01 16:09:34
 */

interface IDate {
  /** @param 开始时间 YYYY-MM-DD HH:mm:ss */
  startDate: string;
  /** @param 结束时间 YYYY-MM-DD HH:mm:ss */
  endDate: string;
}

/** @function 根据分钟数获取HH:mm */
export const getHMByM = (range: number) => {
  const hours = Math.floor(range / 60);
  const minutes = range % 60;
  return `${`${hours}`.padStart(2, "0")}:${`${minutes}`.padStart(2, "0")}`;
};

/**
 * 获取同一天不同时间段的并集
 * @param rArr 同一天的不同时间段
 */
export const getRangeUnion = (rArr: IDate[]) => {
  // 把一分钟当成最小单位，构造一个24*60的数组，记录0为空白区间，1为被占用区间
  const arr: (0 | 1)[] = new Array(24 * 60 - 1).fill(0);

  rArr.forEach((r) => {
    // 找到开始时间的index
    const sDate = new Date(r.startDate);
    const sIndex = sDate.getHours() * 60 + sDate.getMinutes();
    // 找到结束时间的index
    const eDate = new Date(r.endDate);
    const eIndex = eDate.getHours() * 60 + eDate.getMinutes();
    // 需要填充的位数
    const rNum = eIndex - sIndex + 1;
    // 用于填充的数据
    const fArr = new Array(rNum).fill(1);
    // 填充到数组中
    arr.splice(sIndex, rNum, ...fArr);
  });

  // 生成用于返回的数组;
  let start = "";
  const resArr = arr.reduce((p, c, cIndex, arr) => {
    // 如果该元素被填充了，并且还没有生成开始时间
    if (c === 1 && !start) {
      const range = cIndex;
      start = getHMByM(range);
    }
    // 如果该元素没有被填充，并且生成了开始时间
    if (c === 0 && start) {
      const range = cIndex - 1;
      const end = getHMByM(range);
      p.push({ startDate: start, endDate: end });
      start = "";
    }
    return p;
  }, [] as IDate[]);

  if (start) {
    resArr.push({
      startDate: start,
      endDate: "23:59",
    });
  }

  return resArr;
};
