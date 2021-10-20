import LocalStore from "devextreme/data/local_store";

export interface IStructureProps {
  ID: number;
  Name: string;
  Parent_ID?: number;
  Status: string;
}

export const structures:IStructureProps[] = [
  {
    ID: 1,
    Name: "Primitive data structure",
    Parent_ID: 0,
    Status: "active",
  },
  {
    ID: 2,
    Name: "Non-primitive data structure",
    Parent_ID: 0,
    Status: "active",
  },
  {
    ID: 3,
    Name: "Integer",
    Parent_ID: 1,
    Status: "active",
  },
  {
    ID: 4,
    Name: "Float",
    Parent_ID: 1,
    Status: "active",
  },
  {
    ID: 5,
    Name: "Character",
    Parent_ID: 1,
    Status: "deactive",
  },
  {
    ID: 6,
    Name: "Boolean",
    Parent_ID: 1,
    Status: "active",
  },
  {
    ID: 7,
    Name: "Linear data structure",
    Parent_ID: 2,
    Status: "active",
  },
  {
    ID: 8,
    Name: "Non-Linear data structure",
    Parent_ID: 2,
    Status: "active",
  },
  {
    ID: 9,
    Name: "Array",
    Parent_ID: 7,
    Status: "active",
  },
  {
    ID: 10,
    Name: "Stack",
    Parent_ID: 7,
    Status: "active",
  },
  {
    ID: 11,
    Name: "Queue",
    Parent_ID: 7,
    Status: "active",
  },
  {
    ID: 12,
    Name: "Linked list",
    Parent_ID: 7,
    Status: "active",
  },
  {
    ID: 13,
    Name: "Tree",
    Parent_ID: 8,
    Status: "active",
  },
  {
    ID: 14,
    Name: "Graph",
    Parent_ID: 8,
    Status: "deactive",
  },
  {
    ID: 15,
    Name: "Trie",
    Parent_ID: 8,
    Status: "active",
  },
  {
    ID: 16,
    Name: "Hash table",
    Parent_ID: 8,
    Status: "active",
  },
];

export const store = new LocalStore({
  key: "structure",
  data: structures,
  name: "myLocalData",
});
