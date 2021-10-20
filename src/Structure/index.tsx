import React from "react";
import {
  TreeList,
  Column,
  ValidationRule,
  Lookup,
  StateStoring,
} from "devextreme-react/tree-list";
import { store, IStructureProps } from "../structure";

interface IProps {
  structuresData: IStructureProps[];
}

export const Structure: React.FunctionComponent<IProps> = (props: IProps) => {
  const { structuresData } = props;

  const expandedRowKeys = [1];

  const lookupData = {
    store: store,
  };

  return (
    <div id="tree-list-demo">
      <TreeList
        id="structure"
        parentIdExpr="parent_id"
        dataSource={structuresData}
        defaultExpandedRowKeys={expandedRowKeys}
        showRowLines={true}
        showBorders={true}
        columnAutoWidth={true}
        itemsExpr="items"
        keyExpr="id"
        dataStructure="tree"
      >
        <StateStoring
          enabled={true}
          type="localStorage"
          storageKey="structure"
        />
        <Column dataField="name" caption="Name">
          <Lookup dataSource={lookupData} valueExpr="name" displayExpr="name" />
          <ValidationRule type="required" />
        </Column>
        <Column dataField="status" caption="Status">
          <Lookup dataSource={lookupData} displayExpr="status" valueExpr="status" />
          <ValidationRule type="required" />
        </Column>
      </TreeList>
    </div>
  );
};
