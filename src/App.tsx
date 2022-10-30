import React from "react";
import {
  Designer, //设计器根组件，用于下发上下文
  Workbench, //用于创建 Workspace 组件，工作区组件，核心组件，用于管理工作区内的拖拽行为，树节点数据等等...
  ViewPanel, //视图布局面板
  DesignerToolsWidget, //画板工具挂件
  ViewToolsWidget, //视图切换工具挂件
  OutlineTreeWidget, //大纲树组件，它会自动识别当前工作区，展示出工作区内树节点
  ResourceWidget, // 资源组件，可拖拽组件展示区
  StudioPanel, // Designer 子组件
  CompositePanel, //左侧组合布局面板
  WorkspacePanel, //工作区布局面板
  ToolbarPanel, //工具栏布局面板
  ViewportPanel, //视口布局面板
  SettingsPanel, //右侧配置表单布局面板
  ComponentTreeWidget, //组件树渲染器
  HistoryWidget, // 历史记录组件
  IconWidget, //图标挂件，用于获取各种系统内置图标
} from "@designable/react";

import { SettingsForm } from "@designable/react-settings-form";
import { createDesigner, GlobalRegistry } from "@designable/core";

import "antd/dist/antd.less";
import "@designable/react/esm/theme.less";

import Field from "./components/Field";
import FormCollapse from "./components/FormCollapse";
import Root from "./components/Root";

GlobalRegistry.registerDesignerLocales({
  "zh-CN": {
    sources: {
      Inputs: "输入控件",
      Groups: "分组控件",
    },
    settings: {
      value: "控件值",
      header: "标题",
      field: "字段",
      style: {
        width: "宽度",
      },
    },
  },
});

const engine = createDesigner({ rootComponentName: "Root" });
const App = () => {
  return (
    <Designer engine={engine}>
      <Workbench>
        <StudioPanel>
          <CompositePanel>
            {/* eslint-disable-next-line */}
            {/* @ts-ignore */}
            <CompositePanel.Item title="panels.Component" icon="Component">
              <ResourceWidget title="sources.Inputs" sources={[Field]} />
              <ResourceWidget title="sources.Groups" sources={[FormCollapse]} />
            </CompositePanel.Item>
            {/* eslint-disable-next-line */}
            {/* @ts-ignore */}
            <CompositePanel.Item title="panels.OutlinedTree" icon="Outline">
              <OutlineTreeWidget />
            </CompositePanel.Item>
            {/* eslint-disable-next-line */}
            {/* @ts-ignore */}
            <CompositePanel.Item title="panels.History" icon="History">
              <HistoryWidget />
            </CompositePanel.Item>
          </CompositePanel>
          <WorkspacePanel>
            <ToolbarPanel>
              <DesignerToolsWidget />
              <ViewToolsWidget />
            </ToolbarPanel>
            <ViewportPanel>
              <ViewPanel type="DESIGNABLE">
                {() => (
                  <ComponentTreeWidget
                    components={{
                      Root,
                      Field,
                      FormCollapse,
                    }}
                  />
                )}
              </ViewPanel>
              <ViewPanel type="JSONTREE">
                {(tree) => (
                  <div style={{ overflow: "hidden", height: "100%" }} />
                )}
              </ViewPanel>
            </ViewportPanel>
          </WorkspacePanel>
          <SettingsPanel title="panels.PropertySettings">
            <SettingsForm uploadAction="https://www.mocky.io/v2/5cc8019d300000980a055e76" />
          </SettingsPanel>
        </StudioPanel>
      </Workbench>
    </Designer>
  );
};

export default App;
