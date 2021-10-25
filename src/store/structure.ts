import LocalStore from "devextreme/data/local_store";
import DataSource from "devextreme/data/data_source";

import {data} from '../mock/data.json'

export interface IStructureProps {
  id: number;
  name: string;
  parent_id?: number;
  status: boolean;
}

const store = new LocalStore({
  key: "structure",
  data: data,
  name: "myLocalData",
});

export const dataSource = new DataSource({
  store,
});

