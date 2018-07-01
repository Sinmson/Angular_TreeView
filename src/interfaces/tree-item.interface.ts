interface ITreeItem
{
  Id: number;
  Severity: number;
  Name: string;
  Children: ITreeItem[];
  // Parent?: ITreeItem | null;
}