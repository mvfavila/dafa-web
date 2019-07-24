import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

import { ClientsRoutingModule } from "./clients-routing.module";
import { ClientsComponent } from "./clients.component";
import { ClientListComponent } from "./client-list/client-list.component";
import { ClientItemComponent } from "./client-item/client-item.component";
import { ClientStartComponent } from "./client-start/client-start.component";
import { ClientDetailComponent } from "./client-detail/client-detail.component";
import { ClientEditComponent } from "./client-edit/client-edit.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
    ClientsComponent,
    ClientListComponent,
    ClientsComponent,
    ClientItemComponent,
    ClientStartComponent,
    ClientDetailComponent,
    ClientEditComponent
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    ClientsRoutingModule,
    SharedModule
  ]
})
export class ClientsModule {}
