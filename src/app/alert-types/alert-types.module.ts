import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

import { AlertTypesRoutingModule } from "./alert-types-routing.module";
import { AlertTypesComponent } from "./alert-types.component";
import { SharedModule } from "../shared/shared.module";
// import { AlertTypeDetailComponent } from "./alert-type-detail/alert-type-detail.component";
// import { AlertTypeEditComponent } from "./alert-type-edit/alert-type-edit.component";
// import { AlertTypeItemComponent } from "./alert-type-item/alert-type-item.component";
// import { AlertTypeListComponent } from "./alert-type-list/alert-type-list.component";
// import { AlertTypeStartComponent } from "./alert-type-start/alert-type-start.component";

@NgModule({
  declarations: [
    AlertTypesComponent
    // AlertTypeDetailComponent,
    // AlertTypeEditComponent,
    // AlertTypeItemComponent,
    // AlertTypeListComponent,
    // AlertTypeStartComponent
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    AlertTypesRoutingModule,
    SharedModule
  ]
})
export class AlertTypesModule {}
