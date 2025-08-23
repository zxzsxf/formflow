import { connect as connectFn, mapProps, mapReadPretty } from "@formily/react";
// const DataDisplayerComp = require('@wmfe/roo-sqt/dist/components/DataDisplayer');

export function proxytoObject(proxy: object) {
  const tempObject = proxy && typeof proxy === 'object' ? JSON.parse(JSON.stringify(proxy)) : proxy;
  return tempObject;
}


export function connect(compoent: any, readPrettyProps = { type: 'text' }) {
    return connectFn(
      compoent,
      mapProps((props, field) => ({ ...props, field })),
    //   mapReadPretty(DataDisplayerComp.default, readPrettyProps)
    )
  }
