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
  Paging,
  Pager,
  Scrolling,
  RequiredRule,
  Popup,
  PatternRule,
  StringLengthRule,
} from "devextreme-react/tree-list";
import { store, IStructureProps } from "./data";

import "../assets/style.scss";

interface IProps {
  structuresData: IStructureProps[];
  structureData?: IStructureProps;
}

export const Structure: React.FunctionComponent<IProps> = (props: IProps) => {
  const { structuresData, structureData } = props;

  const lookupData = {
    store: store,
  };

  const statusText = { active: "Active", deactive: "Deactive" };
  const expandedRowKeys = [1];
  const allowedPageSizes = [5, 10, 20];
  const popupOptions = {
    title: "Structure Info",
    showTitle: true,
    width: 700,
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
    return <div>{data.value ? statusText.active : statusText.deactive}</div>;
  };

  return (
    <div id="tree-list">
      <TreeList
        dataSource={structuresData}
        columnAutoWidth={true}
        showRowLines={true}
        showBorders={true}
        autoExpandAll={false}
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
          useIcons={true}
        />
        <Popup
          title="Employee Info"
          showTitle={true}
          width={700}
          height={525}
        />
        <Scrolling mode="standard" />
        <Paging enabled={true} defaultPageSize={10} />
        <Pager
          showPageSizeSelector={true}
          allowedPageSizes={allowedPageSizes}
          showInfo={true}
        />
        <Column dataField="name" width={800}>
          <ValidationRule type="required">
            <RequiredRule message="Name is required" />
            <PatternRule
              message="Do not use digits in the Name"
              pattern={/^[^0-9]+$/}
            />
            <StringLengthRule min={3} max={30} />
          </ValidationRule>
        </Column>
        <Column
          dataField="status"
          width={800}
          dataType={structureData?.status}
          cellRender={renderTableCell}
        />
        <Column visible={false} dataField="parent_id" caption="Parent">
          <Lookup dataSource={lookupData} valueExpr="id" displayExpr="name" />
          <ValidationRule type="required" />
        </Column>
        <Column type="buttons" width={300}>
          <Button
            name="edit"
            // icon="icon-pencil"
            cssClass="icon icon-edit"
          />
          <Button
            name="delete"
            // icon="icon-bin2"
            cssClass=" icon icon-delete"
          />
          {/*     <Button
            name="save"
            icon="icon-floppy-disk"
            cssClass="icon icon-save"
          />
          <Button
            name="cancel"
            icon="icon-cross"
            cssClass="icon icon-cancel"
          />*/}
        </Column>
      </TreeList>
    </div>
  );
};
