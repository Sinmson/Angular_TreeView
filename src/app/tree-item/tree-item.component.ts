import { Component, OnInit, Input, ViewEncapsulation } from "@angular/core";
import feather from "feather-icons";

@Component({
  selector: "tree-item",
  templateUrl: "./tree-item.component.html",
  styleUrls: ["./tree-item.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class TreeItemComponent implements OnInit 
{
  constructor()
  { 
    this.ShowSubTree = true;
  }

  @Input() protected treeItem: ITreeItem;
  public get TreeItem() : ITreeItem { return this.treeItem; }
  public set TreeItem(newVal: ITreeItem) { this.treeItem = newVal; }
  
  private showSubTree : boolean;
  public get ShowSubTree() : boolean { return this.showSubTree; }
  public set ShowSubTree(v : boolean) { this.showSubTree = v; }

  public get HasChildren( ) { return this.TreeItem.Children.length > 0; }

  public get SortedChildren() { return this.TreeItem.Children.sort((a,b) => a.Severity - b.Severity); }

  public get Status() { return this.TreeItem.Severity == null  ? "deactivated" : ["critical", "warning", "normal"][this.TreeItem.Severity]; }
  
  ngOnInit()
  {
    console.log("this.TreeItem", this.TreeItem);
    feather.replace();
  }

}
