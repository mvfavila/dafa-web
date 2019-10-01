import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AlertTypesComponent } from "./alert-types.component";
import { AuthGuard } from "../auth/auth.guard";
import { AlertTypeStartComponent } from "./alert-type-start/alert-type-start.component";
import { AlertTypesResolverService } from "./alert-types-resolver.service";
import { AlertTypeEditComponent } from "./alert-type-edit/alert-type-edit.component";
import { AlertTypeDetailComponent } from "./alert-type-detail/alert-type-detail.component";

const routes: Routes = [
  {
    path: "",
    component: AlertTypesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        pathMatch: "full",
        component: AlertTypeStartComponent,
        resolve: [AlertTypesResolverService]
      },
      {
        path: "new",
        component: AlertTypeEditComponent,
        resolve: [AlertTypesResolverService]
      },
      {
        path: ":id",
        component: AlertTypeDetailComponent,
        resolve: [AlertTypesResolverService]
      },
      {
        path: ":id/edit",
        component: AlertTypeEditComponent,
        resolve: [AlertTypesResolverService]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlertTypesRoutingModule {}
