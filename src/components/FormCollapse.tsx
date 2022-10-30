import React, { Fragment } from "react";
import { Collapse } from "antd";
import { observer } from "@formily/react";
import { createBehavior, createResource, TreeNode } from "@designable/core";
import { CollapseProps, CollapsePanelProps } from "antd/lib/collapse";
import {
  DnFC,
  useTreeNode,
  useNodeIdProps,
  TreeNodeWidget,
  useDesigner,
  DroppableWidget,
} from "@designable/react";

const FormCollapse: DnFC<CollapseProps> & {
  CollapsePanel?: React.FC<CollapsePanelProps>;
} = observer((props) => {
  const node = useTreeNode();
  const nodeId = useNodeIdProps();
  const designer = useDesigner();

  const panels = node.children;
  const renderCollapse = () => {
    if (!node.children?.length) return <DroppableWidget />;
    return (
      <Collapse {...props}>
        {panels.map((panel) => {
          const props = panel.props || {};
          return (
            <Collapse.Panel
              {...props}
              style={{ ...props.style }}
              header={
                <span
                  data-content-editable="x-component-props.header"
                  data-content-editable-node-id={panel.id}
                >
                  {props.header}
                </span>
              }
              key={panel.id}
            >
              {React.createElement(
                "div",
                {
                  [designer.props.nodeIdAttrName || ""]: panel.id,
                  style: {
                    padding: "20px 0",
                  },
                },
                panel.children.length ? (
                  <TreeNodeWidget node={panel} />
                ) : (
                  <DroppableWidget />
                )
              )}
            </Collapse.Panel>
          );
        })}
      </Collapse>
    );
  };
  const onAdd = () => {
    const tabPane = new TreeNode({
      componentName: "CollapsePanel",
      props: {
        type: "object",
        "x-component": "CollapsePanel",
        header: `Unnamed Title`,
      },
    });
    node.append(tabPane);
  };

  return (
    <div {...nodeId}>
      {renderCollapse()}
      <button onClick={onAdd}>添加</button>
    </div>
  );
});

export default FormCollapse;

FormCollapse.CollapsePanel = (props) => {
  return <>{props.children}</>;
};

FormCollapse.Behavior = createBehavior(
  {
    name: "FormCollapse",
    selector: (node) =>
      !!node.props && node.props["x-component"] === "FormCollapse",
    designerProps: {
      droppable: true,
      allowAppend: (target: any, source: any) => {
        if (source[0].componentName === "CollapsePanel") {
          return true;
        }
        return false;
      },
      propsSchema: {
        type: "object",
        properties: {
          field: {
            type: "string",
            "x-decorator": "FormItem",
            "x-component": "Input",
          },
          value: {
            type: "string",
            "x-decorator": "FormItem",
            "x-component": "Input",
          },
        },
      },
    },
    designerLocales: {
      "zh-CN": {
        title: "分组",
      },
    },
  },
  {
    name: "CollapsePanel",
    selector: (node) =>
      !!node.props && node.props["x-component"] === "CollapsePanel",
    designerProps: {
      droppable: true,
      draggable: false,
      allowDrop: (node) =>
        !!node.props && node.props["x-component"] === "FormCollapse",
      propsSchema: {
        type: "object",
        properties: {
          header: {
            type: "string",
            "x-decorator": "FormItem",
            "x-component": "Input",
          },
        },
      },
    },
    designerLocales: {
      "zh-CN": {
        title: "分组项目",
      },
    },
  }
);

FormCollapse.Resource = createResource({
  icon: "CollapseSource",
  elements: [
    {
      componentName: "FormCollapse",
      props: {
        type: "void",
        "x-component": "FormCollapse",
      },
    },
  ],
});
