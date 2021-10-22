import LocalStore from "devextreme/data/local_store";

export interface IStructureProps {
  id: number;
  name: string;
  parent_id?: number;
  status: boolean;
}

export const structures: IStructureProps[] = [
  {
    id: 1,
    name: "Primitive data structure",
    parent_id: 0,
    status: true,
  },
  {
    id: 2,
    name: "Non-primitive data structure",
    parent_id: 0,
    status: true,
  },
  {
    id: 3,
    name: "Integer",
    parent_id: 1,
    status: true,
  },
  {
    id: 4,
    name: "Float",
    parent_id: 1,
    status: true,
  },
  {
    id: 5,
    name: "Character",
    parent_id: 1,
    status: false,
  },
  {
    id: 6,
    name: "Boolean",
    parent_id: 1,
    status: true,
  },
  {
    id: 7,
    name: "Linear data structure",
    parent_id: 2,
    status: true,
  },
  {
    id: 8,
    name: "Non-Linear data structure",
    parent_id: 2,
    status: true,
  },
  {
    id: 9,
    name: "Array",
    parent_id: 7,
    status: true,
  },
  {
    id: 10,
    name: "Stack",
    parent_id: 7,
    status: true,
  },
  {
    id: 11,
    name: "Queue",
    parent_id: 7,
    status: true,
  },
  {
    id: 12,
    name: "Linked list",
    parent_id: 7,
    status: true,
  },
  {
    id: 13,
    name: "Tree",
    parent_id: 8,
    status: true,
  },
  {
    id: 14,
    name: "Graph",
    parent_id: 8,
    status: false,
  },
  {
    id: 15,
    name: "Trie",
    parent_id: 8,
    status: true,
  },
  {
    id: 16,
    name: "Hash table",
    parent_id: 8,
    status: true,
  },
];

export const store = new LocalStore({
  key: "structure",
  data: structures,
  name: "myLocalData",
});
