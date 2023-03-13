/*
 * @Author: liu7i
 * @Date: 2023-01-20 17:18:22
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-03-01 14:29:30
 */

export const classNames = (obj: { [key: string]: boolean | undefined }) => {
  let className = "";
  Object.keys(obj).forEach((i) => {
    // @ts-ignore
    if (obj[i] as boolean) {
      className += `${i} `;
    }
  });
  return className;
};

/**
 * @function 根据某个key去除数组中重复的元素
 * @param repeatArr 可能有重复数据的数组
 * @param key 数组中某个对象的key
 * @returns 没有重复数据的数组
 */
export const removeRepeat = <T extends { [key: string]: any }>(
  repeatArr: T[],
  key: keyof T
) => {
  const singleArr: T[] = [];
  const singleKeyArr: any[] = [];

  repeatArr.forEach((t) => {
    if (singleKeyArr.includes(t[key])) {
      return;
    }
    singleArr.push(t);
    singleKeyArr.push(t[key]);
  });

  return singleArr;
};

export * from "./modules/constant";
export * from "./modules/text";
export * from "./modules/dateHelper";
export * from "./modules/event";
export * from "./modules/range";

/** @param 拖拽事件的触发延时 */
export const dragTime = 300;
/** @param 拖动的精度误差，防止用户是手抖点击不是拖拽 */
export const errorAccuracy = 20;
