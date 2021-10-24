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
  PatternRule,
} from "devextreme-react/tree-list";
import { Switch } from "devextreme-react";

import { dataSource, IStructureProps } from "../../store/structure";

interface IProps {
  structuresData: IStructureProps[];
}

export const Structure: React.FunctionComponent<IProps> = (props: IProps) => {
  const lookupData = {
    store: dataSource.store(),
  };
  const { structuresData } = props;
  const statusText = { active: "Active", deactive: "Deactive" };

  const expandedRowKeys = [1];
  const allowedPageSizes = [5, 10, 20];

  const onEditorPreparing = (e: any) => {
    if (e.dataField === "parent_id" && e.row?.data.id === 1) {
      e.cancel = true;
    }
  };

  const onInitNewRow = (e: any) => {
    e.data.parent_id = 1;
  };

  const renderEditStatusValueCell = (status: any) => {
    return (
      <Switch
        defaultValue={status.value}
        onValueChanged={(changedValue) => {
          status.setValue(changedValue.value);
        }}
        switchedOffText="deactive"
        switchedOnText="active"
        width={150}
      />
    );
  };

  const renderStatusValueCell = (data: any) => {
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
          useIcons={true}
        />
        <Scrolling mode="standard" />
        <Paging enabled={true} defaultPageSize={5} />
        <Pager
          showPageSizeSelector={true}
          allowedPageSizes={allowedPageSizes}
          showInfo={true}
        />
        <Column dataField="name">
          <ValidationRule type="required" />
          <RequiredRule message="Name is required" />
          <PatternRule
            message="Do not use digits in the Name"
            pattern={/^[^0-9]+$/}
          />
        </Column>
        <Column
          dataField="status"
          cellRender={renderStatusValueCell}
          editCellRender={renderEditStatusValueCell}
        />
        <Column dataField="parent_id" caption="Parent">
          <Lookup dataSource={lookupData} valueExpr="id" displayExpr="name" />
          <ValidationRule type="required" />
        </Column>
        <Column type="buttons">
          <Button name="add" icon="add" />
          <Button name="save" icon="save" />
          <Button
            name="edit"
            // icon="icon-pencil"
          />
          <Button
            name="delete"
            // icon="icon-bin2"
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
