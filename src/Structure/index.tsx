import React from "react";
import {
  TreeList,
  Editing,
  Column,
  ValidationRule,
  Lookup,
  Button,
  Sorting,
  FilterRow,
  HeaderFilter,
  SearchPanel,
  StateStoring,
} from "devextreme-react/tree-list";
import { store, IStructureProps } from "../structure";

import "./index.scss";

interface IProps {
  structuresData: IStructureProps[];
  structureData?: IStructureProps;
}

export const Structure: React.FunctionComponent<IProps> = (props: IProps) => {
  const { structuresData, structureData } = props;

  const expandedRowKeys = [1];

  const popupOptions = {
    title: "Structure Info",
    showTitle: true,
    width: 700,
  };

  const lookupData = {
    store: store,
  };

  const onEditorPreparing = (e: any) => {
    if (e.dataField === "parent_id" && e.row.data.id === 1) {
      e.editorOptions.disabled = true;
      e.editorOptions.value = null;
    }
  };
  const onInitNewRow = (e: any) => {
    e.data.parent_id = 1;
  };

  const renderTableCell = (data: any) => {
    console.log(data);
    return <div>{data.value ? "Active" : "Deactive"}</div>;
  };

  return (
    <div id="tree-list">
      <TreeList
        dataSource={structuresData}
        columnAutoWidth={true}
        showRowLines={true}
        showBorders={true}
        defaultExpandedRowKeys={expandedRowKeys}
        keyExpr="id"
        parentIdExpr="parent_id"
        onEditorPreparing={onEditorPreparing}
        onInitNewRow={onInitNewRow}
      >
        <StateStoring
          enabled={true}
          type="localStorage"
          storageKey="structure"
        />
        <FilterRow visible={true} />
        <HeaderFilter visible={true} />
        <SearchPanel visible={true} />
        <Sorting mode="multiple" />
        <Editing
          allowUpdating={true}
          allowDeleting={true}
          allowAdding={true}
          popup={popupOptions}
          mode="popup"
        />
        <Column dataField="name">
          <ValidationRule type="required" />
        </Column>
        <Column
          dataField="status"
          dataType={structureData?.status}
          cellRender={renderTableCell}
          filterType="string"
        />
        <Column visible={false} dataField="parent_id" caption="Parent">
          <Lookup dataSource={lookupData} valueExpr="id" displayExpr="name" />
          <ValidationRule type="required" />
        </Column>
        <Column type="buttons">
          <Button name="edit" />
          <Button name="delete" />
        </Column>
      </TreeList>
    </div>
  );
};
