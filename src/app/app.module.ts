import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { TreeItemComponent } from "./tree-item/tree-item.component";
import { DeepdiveComponent } from "./deepdive/deepdive.component";

@NgModule({
  declarations: [
    AppComponent,
    TreeItemComponent,
    DeepdiveComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
