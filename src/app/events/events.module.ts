import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

// import { EventsRoutingModule } from "./events-routing.module";
import { EventsComponent } from "./events.component";
// import { EventListComponent } from "./event-list/event-list.component";
// import { EventItemComponent } from "./event-item/event-item.component";
// import { EventStartComponent } from "./event-start/event-start.component";
// import { EventDetailComponent } from "./event-detail/event-detail.component";
// import { EventEditComponent } from "./event-edit/event-edit.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
    EventsComponent
    // EventListComponent,
    // EventItemComponent,
    // EventStartComponent,
    // EventDetailComponent,
    // EventEditComponent
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    // EventsRoutingModule,
    SharedModule
  ]
})
export class EventsModule {}
