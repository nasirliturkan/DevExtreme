import React from "react";
import {
  TreeList,
  Editing,
  Column,
  ValidationRule,
  Lookup,
  Button,
  Sorting,
  HeaderFilter,
  SearchPanel,
  StateStoring,
  Paging,
  Pager,
  Scrolling,
  RequiredRule,
  PatternRule,
  AsyncRule,
} from "devextreme-react/tree-list";
import { Switch } from "devextreme-react";

import { dataSource, IStructureProps } from "../../store/structure";
import { StringLengthRule } from "devextreme-react/form";

import "../../assets/style.scss";

interface IProps {
  structuresData: IStructureProps[];
}

export const Structure: React.FunctionComponent<IProps> = (props: IProps) => {
  const { structuresData } = props;
  const lookupData = {
    store: dataSource.store(),
  };
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

  const renderUniqueValueValidation = (value: any) => {
    return dataSource
      .store()
      .load()
      .then((structures: any) => {
        const findDuplicate = structures.find(
          (data: any) =>
            data.name === value.data.name && data.id !== value.data.id
        );
        return !findDuplicate?.id;
      });
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

        {/*Name Column*/}
        <Column dataField="name" name="name">
          <ValidationRule type="required" />
          <RequiredRule message="Name is required" />
          <PatternRule
            message="Do not use digits in the Name"
            pattern={/^[^0-9]+$/}
          />
          <StringLengthRule min={3} max={30} />
          <AsyncRule
            validationCallback={renderUniqueValueValidation}
            message="Name must be unique"
          />
        </Column>

        {/*Parent column*/}
        <Column dataField="parent_id" caption="Parent">
          <Lookup dataSource={lookupData} valueExpr="id" displayExpr="name" />
        </Column>

        {/*Status column*/}
        <Column
          dataField="status"
          cellRender={renderStatusValueCell}
          editCellRender={renderEditStatusValueCell}
        />

        {/*Buttons column*/}
        <Column type="buttons">
          <Button name="save" icon="icon icon-folder-download" />
          <Button name="edit" icon="icon icon-pencil" />
          <Button name="delete" icon="icon icon-bin" />
          <Button name="cancel" icon="icon icon-exit" />
        </Column>
      </TreeList>
    </div>
  );
};
