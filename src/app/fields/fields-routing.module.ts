import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { FieldsComponent } from "./fields.component";
import { AuthGuard } from "../auth/auth.guard";
import { FieldStartComponent } from "./field-start/field-start.component";
import { FieldsResolverService } from "./fields-resolver.service";
import { FieldEditComponent } from "./field-edit/field-edit.component";
import { FieldDetailComponent } from "./field-detail/field-detail.component";

const routes: Routes = [
  {
    path: "",
    component: FieldsComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        pathMatch: "full",
        component: FieldStartComponent,
        resolve: [FieldsResolverService]
      },
      // { path: "new", component: FieldEditComponent },
      {
        path: ":id",
        component: FieldDetailComponent,
        resolve: [FieldsResolverService]
      },
      {
        path: ":id/edit",
        component: FieldEditComponent,
        resolve: [FieldsResolverService]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FieldsRoutingModule {}
