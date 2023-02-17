/*
 * @Author: liu7i
 * @Date: 2023-02-14 16:58:37
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-02-16 18:19:07
 */
import { useMemo } from "react";
import { ISubRootProps } from "components/Calendar/interface";

export const useCommonComputed = (_props: ISubRootProps) => {
  const { data, props } = _props;

  const colItems = useMemo(() => {
    let start = (data.index - 1) * data.pageSize - 2;
    if (start < 0) {
      start = 0;
    }
    let end: number | undefined = start + data.pageSize;
    let maxStart = (props.colItems?.length ?? 0) - data.pageSize;
    if (maxStart < start) {
      start = maxStart;
      end = undefined;
    }
    if (start < 0) {
      start = 0;
    }

    const resource_ = (props.colItems || []).slice(start, end);
    return resource_;
  }, [props.colItems, data.index, data.pageSize]);

  const canReduceCol = useMemo(() => {
    return data.index !== 1;
  }, [data.index]);

  const canAddCol = useMemo(() => {
    return data.index * data.pageSize - 2 < (props.colItems?.length ?? 0);
  }, [data.index, data.pageSize, props.colItems]);

  return { colItems, canReduceCol, canAddCol };
};
