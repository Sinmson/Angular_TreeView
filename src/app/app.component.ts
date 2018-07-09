import { Component, ViewEncapsulation, Input } from "@angular/core";
import merge from "deepmerge";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss", "./app.component.dark.scss", "app.component.light.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  ngOnInit(): void 
  {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.    
    this.Themes = ["light", "dark"];
    this.ThemeNr = 0;
  }

  protected themeNr : number;  
  public get ThemeNr() : number {	return this.themeNr; }
  public set ThemeNr(newVal : number) {	this.themeNr = newVal; }

  protected themes : string[];  
  public get Themes() : string[] {	return this.themes; }
  public set Themes(newVal : string[]) {	this.themes = newVal; }
  
  protected selectedTreeItems : ITreeItem[] | null;  
  public get SelectedTreeItems() : ITreeItem[] | null {	return this.selectedTreeItems; }
  public set SelectedTreeItems(newVal : ITreeItem[] | null) {	this.selectedTreeItems = newVal; }  
  
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

  public SwitchToNextTheme()
  {
    this.ThemeNr = this.NextThemeNr;
  }  
}
