import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { AuthComponent } from "./auth.component";

@NgModule({
    imports: [BrowserModule, FormsModule, RouterModule],
    declarations: [AdminComponent,  AuthComponent],
})
export class AdminModule{}