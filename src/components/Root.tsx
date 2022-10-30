import React from "react";
import { createBehavior } from "@designable/core";
import { DnFC } from "@designable/react";

interface RootProps {
  labelCol?: number;
  wrapperCol?: number;
  version?: string;
}

const Root: DnFC<RootProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default Root;

Root.Behavior = createBehavior({
  name: "Root",
  selector: "Root",
  designerProps(node) {
    return {
      draggable: !node.isRoot,
      cloneable: !node.isRoot,
      deletable: !node.isRoot,
      droppable: true,
      propsSchema: {
        // type: "object",
        // properties: {
        //   labelCol: {
        //     type: "string",
        //     "x-decorator": "FormItem",
        //     "x-component": "Input",
        //   },
        //   wrapperCol: {
        //     type: "string",
        //     "x-decorator": "FormItem",
        //     "x-component": "Input",
        //   },
        //   version: {
        //     type: "string",
        //     "x-decorator": "FormItem",
        //     "x-component": "Input",
        //   },
        // },
      },
    };
  },
  designerLocales: {
    "zh-CN": {
      title: "根控件",
    },
  },
});
