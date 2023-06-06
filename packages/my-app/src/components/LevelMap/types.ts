export interface LevelMapData {
  name: string;
  children?: Array<LevelMapData>;
  left?: boolean;
  collapse?: boolean;
  isEdit?: boolean;
}
