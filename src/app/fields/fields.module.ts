import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

import { FieldsRoutingModule } from "./fields-routing.module";
import { FieldsComponent } from "./fields.component";
import { FieldListComponent } from "./field-list/field-list.component";
import { FieldItemComponent } from "./field-item/field-item.component";
import { FieldStartComponent } from "./field-start/field-start.component";
import { FieldDetailComponent } from "./field-detail/field-detail.component";
import { FieldEditComponent } from "./field-edit/field-edit.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
    FieldsComponent,
    FieldListComponent,
    FieldsComponent,
    FieldItemComponent,
    FieldStartComponent,
    FieldDetailComponent,
    FieldEditComponent
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    FieldsRoutingModule,
    SharedModule
  ]
})
export class FieldsModule {}
