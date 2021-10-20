import React, { useEffect } from "react";
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

interface IProps {
  structuresData: IStructureProps[];
}

export const Structure: React.FunctionComponent<IProps> = (props: IProps) => {
  const { structuresData } = props;
  useEffect(() => {
    console.log("-------------------------", structuresData);
    console.log("store", store);
  }, [store]);

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
    if (e.dataField === "Parent_ID" && e.row.data.id === 1) {
      e.editorOptions.disabled = true;
      e.editorOptions.value = null;
    }
  };
  const onInitNewRow = (e: any) => {
    e.data.parent_id = 1;
  };

  return (
    <div id="tree-list">
      <TreeList
        dataSource={structuresData}
        columnAutoWidth={true}
        showRowLines={true}
        showBorders={true}
        defaultExpandedRowKeys={expandedRowKeys}
        keyExpr="ID"
        parentIdExpr="Parent_ID"
        onEditorPreparing={onEditorPreparing}
        onInitNewRow={onInitNewRow}
        selectedRowKeys={[1]}
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
        <Column dataField="Name">
          <ValidationRule type="required" />
        </Column>
        <Column dataField="Status" caption="Status">
          <ValidationRule type="required" />
        </Column>
        <Column visible={false} dataField="Parent_ID" caption="Parent">
          <Lookup dataSource={lookupData} valueExpr="ID" displayExpr="Name" />
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
