/*
 * @Author: liu7i
 * @Date: 2023-03-01 14:29:17
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-03-01 16:09:34
 */
import dayjs from "dayjs";
import { IEvent } from "../../interface";

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
export const getRangeUnion = (
  /** @param 同一天的不同时间段 */
  rArr: IDate[]
) => {
  if (!rArr?.length) {
    return [];
  }

  // 把一分钟当成最小单位，构造一个24*60 - 1的数组，记录0为空白区间，1为被占用区间
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

  const dateStr = dayjs(rArr[0].startDate).format("YYYY-MM-DD");

  let start = "";
  // 生成用于返回的数组;
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
      p.push({
        startDate: `${dateStr} ${start}:00`,
        endDate: `${dateStr} ${end}:00`,
      });
      start = "";
    }
    return p;
  }, [] as IDate[]);

  if (start) {
    resArr.push({
      startDate: `${dateStr} ${start}:00`,
      endDate: `${dateStr} 23:59:00`,
    });
  }

  return resArr;
};

/**
 * 获取同一天不同时间段的并集的补集
 * @param rArr 同一天的不同时间段
 * @param dateStr YYYY-MM-DD 时间用于处理时间段为空但是需要求补集的情况
 */
export const getRangeComplementarySet = (
  /** @param 同一天的不同时间段 */
  rArr: IDate[],
  /** @param YYYY-MM-DD 时间用于处理时间段为空但是需要求补集的情况 */
  dateStr: string = ""
) => {
  if (!rArr?.length) {
    return [
      {
        startDate: `${dateStr} 00:00:00`,
        endDate: `${dateStr} 23:59:00`,
      },
    ];
  }

  // 把一分钟当成最小单位，构造一个24*60 - 1的数组，记录0为空白区间，1为被占用区间
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

  // 如果是求补集
  let start = "";
  // 生成用于返回的数组;
  const resArr = arr.reduce((p, c, cIndex, arr) => {
    // 如果该元素被填充了，并且还没有生成开始时间
    if (c === 0 && !start) {
      const range = cIndex === 0 ? 0 : cIndex - 1;
      start = getHMByM(range);
    }
    // 如果该元素没有被填充，并且生成了开始时间
    if (c === 1 && start) {
      const range = cIndex;
      const end = getHMByM(range);
      p.push({
        startDate: `${dateStr} ${start}:00`,
        endDate: `${dateStr} ${end}:00`,
      });
      start = "";
    }
    return p;
  }, [] as IDate[]);

  if (start) {
    resArr.push({
      startDate: `${dateStr} ${start}:00`,
      endDate: `${dateStr} 23:59:00`,
    });
  }

  return resArr;
};

type TRangeItem = string | number | Date;

/** @function 判断两个时间段是否有交集 */
export const checkRangeBeMixed = (
  range: { s: TRangeItem; e: TRangeItem },
  rangeB: { s: TRangeItem; e: TRangeItem }
) => {
  const [As, Ae] = [new Date(range.s).getTime(), new Date(range.e).getTime()];
  const [Bs, Be] = [new Date(rangeB.s).getTime(), new Date(rangeB.e).getTime()];

  if (Ae <= Bs) {
    return false;
  }

  if (Be <= As) {
    return false;
  }

  return true;
};

/** @function 计算在指定的时间区间，一个事件能拖动到的最晚开始时间 */
export const getEventMaxStartStr = (req: {
  /** @param 事件信息 */
  et: IEvent;
  /** @param 当前时间 */
  date: Date;
  /** @param 配置的结束时间 */
  timeEnd: number;
  /** @param 想要拖拽到的结束时间 YYYY-MM-DD HH:mm:ss */
  startTimeStr: string;
}) => {
  const { et, date, timeEnd, startTimeStr } = req;
  const todayEnd = dayjs(date).format(
    `YYYY-MM-DD ${`${timeEnd}`.padStart(2, "0")}:00:00`
  );
  const range =
    new Date(et.endTimeStr).getTime() - new Date(et.startTimeStr).getTime();
  const maxStart = new Date(todayEnd).getTime() - range;
  let startTimeStr_ =
    new Date(startTimeStr).getTime() <= maxStart
      ? startTimeStr
      : dayjs(maxStart).format("YYYY-MM-DD HH:mm:ss");
  return startTimeStr_;
};
