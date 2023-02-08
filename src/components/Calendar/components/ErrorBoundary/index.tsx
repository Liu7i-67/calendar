/*
 * @Author: liu7i
 * @Date: 2023-02-08 14:09:46
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-02-08 14:19:48
 */

import React from "react";

interface IObj {
  children: React.ReactNode;
  [key: string]: any;
}

class ErrorBoundary extends React.Component<IObj, { hasError: boolean }> {
  constructor(props: IObj) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div>发生了意料之外的错误，点击返回老版本日历</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
