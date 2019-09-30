import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { EventTypesComponent } from "./event-types.component";
import { AuthGuard } from "../auth/auth.guard";
import { EventTypeStartComponent } from "./event-type-start/event-type-start.component";
import { EventTypesResolverService } from "./event-types-resolver.service";
import { EventTypeEditComponent } from "./event-type-edit/event-type-edit.component";
import { EventTypeDetailComponent } from "./event-type-detail/event-type-detail.component";

const routes: Routes = [
  {
    path: "",
    component: EventTypesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        pathMatch: "full",
        component: EventTypeStartComponent,
        resolve: [EventTypesResolverService]
      },
      {
        path: "new",
        component: EventTypeEditComponent,
        resolve: [EventTypesResolverService]
      },
      {
        path: ":id",
        component: EventTypeDetailComponent,
        resolve: [EventTypesResolverService]
      },
      {
        path: ":id/edit",
        component: EventTypeEditComponent,
        resolve: [EventTypesResolverService]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventTypesRoutingModule {}
