interface ITreeItem
{
  Id: number;
  Severity: number;
  Name: string;
  Children: ITreeItem[];
  IsSelected?: boolean;
  ShowSubTree?: boolean;
  ContainsSearchStr? : boolean;
  // Parent?: ITreeItem | null;
}

interface ITreeItemClicked
{
  TreeItem: ITreeItem;
  CtrlKeyPressed: boolean;
}