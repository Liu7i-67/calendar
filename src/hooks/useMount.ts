/*
 * @Author: liu7i
 * @Date: 2023-01-20 16:18:41
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-01-20 16:21:12
 */
import { useEffect, useRef } from "react";

export const useMount = (
  effect: React.EffectCallback,
  deps?: React.DependencyList | undefined
) => {
  const flag = useRef(false);

  useEffect(() => {
    if (flag.current) {
      return;
    }
    flag.current = true;
    effect();
  }, deps);
};
