import { Component, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = "app";

  ngOnInit()
  {
    this.TreeItems = [{
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
      }]
    }];    

    this.TreeItems[0].Children.push();
  }

  private treeItems : ITreeItem[];
  public get TreeItems() : ITreeItem[] { return this.treeItems; }
  public set TreeItems(v : ITreeItem[]) { this.treeItems = v; }
}
