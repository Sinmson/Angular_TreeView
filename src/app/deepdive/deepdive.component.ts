import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "deepdive",
  templateUrl: "./deepdive.component.html",
  styleUrls: ["./deepdive.component.scss"]
})
export class DeepdiveComponent implements OnInit {

  constructor() { }

  ngOnInit()
  {
    this.SearchStr = "";
    
    this.ApplicationTreeItem = {
      Id: 0,
      Name: "Applications",   
      Severity: 0,
      Children: [{
        Id: 1,
        Name: "TIMB-MV", 
        Severity: 0,
        Children: [{
          Id: 2,
          Name: "Transactions", 
          Severity: 0,
          Children: [{
            Id: 3,
            Name: "ASSAUFTRPRUEFEN0110_RR", 
            Severity: 2,
            Children: []
          },{
            Id: 4,
            Name: "INLANDSADRESSEPRUEFEN_0400_RR", 
            Severity: 1,
            Children: []
          },{
            Id: 5,
            Name: "IDMINFOSERVICE0100_RR", 
            Severity: 0,
            Children: []
          },{
            Id: 6,
            Name: "ZUGANGSDATENMGMT0100_PR", 
            Severity: 2,
            Children: []
          }]
        }]
      },
      {
        Id: 7,
        Name: "TIMB-KV", 
        Severity: 0,
        Children: [{
          Id: 8,
          Name: "Transactions",
          Severity: 0,
          Children: [{
            Id: 9,
            Name: "ASSAUFTRPRUEFEN0110_KK", 
            Severity: 1,
            Children: []
          }]
        }]
      }]
    };
  }

  private applicationTreeItem : ITreeItem;
  public get ApplicationTreeItem() : ITreeItem { return this.applicationTreeItem; }
  public set ApplicationTreeItem(v : ITreeItem) { this.applicationTreeItem = v; }  

  protected searchStr : string;  
  public get SearchStr() : string {	return this.searchStr; }
  public set SearchStr(newVal : string) {	this.searchStr = newVal; }

  @Output() select = new EventEmitter<ITreeItem[]>();

  public HandleSearchInput()
  {
    const result = this.GetFilteredChildren(this.ApplicationTreeItem);  
    console.log("HandleSearchInput", result);
    
  }

  public GetFilteredChildren(treeItem: ITreeItem) : ITreeItem[]
  {
    const containerSearchStr = [];
    treeItem.Children.map((treeItem2) =>
    {
      const results = this.GetFilteredChildren(treeItem2); 
      console.log("results", results);

      containerSearchStr.push(...results);      
      console.log(this.SearchStr.toLowerCase()," in ",  
                  treeItem2.Name.toLowerCase(), " ? ", treeItem2.Name.toLowerCase().includes(this.SearchStr.toLowerCase()));
      
      if(treeItem2.Name.toLowerCase().includes(this.SearchStr.toLowerCase()) || results.length > 0)
      {
        treeItem2.ContainsSearchStr = true;   
        containerSearchStr.push(treeItem2);
        return treeItem2;
      }
      
      treeItem2.ContainsSearchStr = false;
      return false;
    });
    return containerSearchStr;     
  }

  public get SelectedTreeItems() : ITreeItem[]
  {
    return this.GetSelectedTreeItems(this.ApplicationTreeItem);
  }

  public GetSelectedTreeItems(tItem : ITreeItem) : ITreeItem[]
  {
    const selected : ITreeItem[] = [];
    for(const child of tItem.Children) 
    {
      const result = this.GetSelectedTreeItems(child);
      selected.push(...result);
      if(child.IsSelected) selected.push(child);
    }

    return selected.sort((a, b) => a.Severity - b.Severity);
  }

  protected HandleTreeItemClicked(treeItemClickedEvent: ITreeItemClicked)
  {
    const clickedTreeItem = treeItemClickedEvent.TreeItem;
    if(clickedTreeItem === this.ApplicationTreeItem) return;
    if(treeItemClickedEvent.CtrlKeyPressed)
    {
      clickedTreeItem.IsSelected = clickedTreeItem.IsSelected ? false : true;
    }
    else
    {
      for (const selectedItem of this.SelectedTreeItems) 
      {
        selectedItem.IsSelected = false;
      }
      clickedTreeItem.IsSelected = true;
    }
    console.log("emit", this.SelectedTreeItems);
    
    this.select.emit(this.SelectedTreeItems);
  }

}
