import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter } from "@angular/core";
import feather from "feather-icons";

@Component({
  selector: "tree-item",
  templateUrl: "./tree-item.component.html",
  styleUrls: ["./tree-item.component.scss"]
  // encapsulation: ViewEncapsulation.None
})
export class TreeItemComponent implements OnInit 
{
  constructor()
  { 
  }

  @Input() protected treeItem: ITreeItem;
  public get TreeItem() : ITreeItem { return this.treeItem; }
  public set TreeItem(newVal: ITreeItem) { this.treeItem = newVal; }

  public get HasChildren( ) { return this.TreeItem.Children.length > 0; }

  public get SortedChildren() { return this.TreeItem.Children.sort((a,b) => a.Severity - b.Severity); }

  public get Status() { return this.TreeItem.Severity == null  ? "deactivated" : ["critical", "warning", "normal"][this.TreeItem.Severity]; }

  public get IsHidden()
  {
    return (("ContainsSearchStr" in this.TreeItem) && !this.TreeItem.ContainsSearchStr);
  }

  @Output() subItemClicked: EventEmitter<ITreeItemClicked> = new EventEmitter();

  protected HandleTreeItemClicked(event, clickedTreeItem)
  {
    this.subItemClicked.emit({ TreeItem: clickedTreeItem, CtrlKeyPressed: event.ctrlKey ? true : false });
  }

  protected PassTreeItemClickedToParent(clickedTreeItemEvent: ITreeItemClicked,)
  {       
    this.subItemClicked.emit(clickedTreeItemEvent);
  }

  protected ToggleSubTreeVisibility()
  {    
    this.TreeItem.ShowSubTree = this.TreeItem.ShowSubTree ? false : true;
  }

  ngOnInit()
  {
    // console.log("this.TreeItem", this.TreeItem);
  }

}
