export interface TableMapData {
  name: string;
  children?: Array<TableMapData>;
  left?: boolean;
  collapse?: boolean;
  isEdit?: boolean;
}
