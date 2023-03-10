/*
 * @Author: liu7i
 * @Date: 2023-03-10 14:22:50
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-03-10 14:34:39
 */
import React from "react";

export interface IPaddingPromise {
  promise: Promise<any>;
  cancel: () => boolean;
}

export const cancellablePromise = (promise: Promise<any>) => {
  let isCanceled = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      (value) => (isCanceled ? reject({ isCanceled, value }) : resolve(value)),
      (error) => reject({ isCanceled, error })
    );
  });

  return {
    promise: wrappedPromise,
    cancel: () => (isCanceled = true),
  };
};

export const useCancellablePromises = () => {
  const pendingPromises = React.useRef<IPaddingPromise[]>([]);

  const appendPendingPromise = (promise: IPaddingPromise) =>
    (pendingPromises.current = [...pendingPromises.current, promise]);

  const removePendingPromise = (promise: IPaddingPromise) =>
    (pendingPromises.current = pendingPromises.current.filter(
      (p) => p !== promise
    ));

  const clearPendingPromises = () =>
    pendingPromises.current.map((p) => p.cancel());

  const api = {
    appendPendingPromise,
    removePendingPromise,
    clearPendingPromises,
  };

  return api;
};

const delay = (n: number) => new Promise((resolve) => setTimeout(resolve, n));

export const useClickPreventionOnDoubleClick = <
  T extends Function,
  K extends Function
>(
  onClick: T,
  onDoubleClick: K
) => {
  const api = useCancellablePromises();

  const handleClick = (...pra: undefined[] | any[]) => {
    api.clearPendingPromises();
    const waitForClick = cancellablePromise(delay(300));
    api.appendPendingPromise(waitForClick);

    return waitForClick.promise
      .then(() => {
        api.removePendingPromise(waitForClick);
        onClick?.(pra);
      })
      .catch((errorInfo) => {
        api.removePendingPromise(waitForClick);
        if (!errorInfo.isCanceled) {
          throw errorInfo.error;
        }
      });
  };

  const handleDoubleClick = (...pra: undefined[] | any[]) => {
    api.clearPendingPromises();
    onDoubleClick?.(pra);
  };

  return [handleClick, handleDoubleClick];
};
