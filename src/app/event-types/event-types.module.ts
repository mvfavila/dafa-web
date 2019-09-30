import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

import { EventTypesRoutingModule } from "./event-types-routing.module";
import { EventTypesComponent } from "./event-types.component";
import { SharedModule } from "../shared/shared.module";
import { EventTypeDetailComponent } from "./event-type-detail/event-type-detail.component";
import { EventTypeEditComponent } from "./event-type-edit/event-type-edit.component";
import { EventTypeItemComponent } from "./event-type-item/event-type-item.component";
import { EventTypeListComponent } from "./event-type-list/event-type-list.component";
import { EventTypeStartComponent } from "./event-type-start/event-type-start.component";

@NgModule({
  declarations: [
    EventTypesComponent,
    EventTypeDetailComponent,
    EventTypeEditComponent,
    EventTypeItemComponent,
    EventTypeListComponent,
    EventTypeStartComponent
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    EventTypesRoutingModule,
    SharedModule
  ]
})
export class EventTypesModule {}
