import { Component, ViewEncapsulation, Input } from "@angular/core";
import merge from "deepmerge";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  ngOnInit()
  {
    this.Themes = ["light", "dark"];
    this.ThemeNr = 0;
    this.SearchStr = "";
    this.SelectedTreeItem = null;
    
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

  protected themeNr : number;  
  public get ThemeNr() : number {	return this.themeNr; }
  public set ThemeNr(newVal : number) {	this.themeNr = newVal; }

  protected themes : string[];
  
  public get Themes() : string[] {	return this.themes; }
  public set Themes(newVal : string[]) {	this.themes = newVal; }
  
  public get Theme() 
  {
    if(this.ThemeNr != null && this.ThemeNr !== undefined && this.ThemeNr >= 0 && this.ThemeNr < this.Themes.length)
    {
      return this.Themes[this.themeNr];
    }
    this.ThemeNr = 0;
    return this.Themes[this.ThemeNr];    
  }

  public get NextThemeNr() 
  {
    let nextThemeNr : number = this.ThemeNr + 1;
    if(nextThemeNr >= this.Themes.length)
    {
      nextThemeNr = 0;
    }
    return nextThemeNr;
  }

  public get NextTheme() { return this.Themes[this.NextThemeNr]; }

  protected searchStr : string;  
  public get SearchStr() : string {	return this.searchStr; }
  public set SearchStr(newVal : string) {	this.searchStr = newVal; }

  protected selectedTreeItem : ITreeItem | null;
  
  public get SelectedTreeItem() : ITreeItem | null {	return this.selectedTreeItem; }
  public set SelectedTreeItem(newVal : ITreeItem | null) {	this.selectedTreeItem = newVal; }  

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
    const selected = [];
    for(const child of tItem.Children) 
    {
      const result = this.GetSelectedTreeItems(child);
      selected.push(...result);
      if(child.IsSelected) selected.push(child);
    }

    return selected;
  }

  public SwitchToNextTheme()
  {
    this.ThemeNr = this.NextThemeNr;   
    console.log("This.ApplicationTreeItem: ", this.ApplicationTreeItem);
     
  }
}
