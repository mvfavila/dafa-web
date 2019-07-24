import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ClientsComponent } from "./clients.component";
import { AuthGuard } from "../auth/auth.guard";
import { ClientStartComponent } from "./client-start/client-start.component";
import { ClientsResolverService } from "./clients-resolver.service";
import { ClientEditComponent } from "./client-edit/client-edit.component";
import { ClientDetailComponent } from "./client-detail/client-detail.component";

const routes: Routes = [
  {
    path: "",
    component: ClientsComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        pathMatch: "full",
        component: ClientStartComponent,
        resolve: [ClientsResolverService]
      },
      // { path: "new", component: ClientEditComponent },
      {
        path: ":id",
        component: ClientDetailComponent,
        resolve: [ClientsResolverService]
      },
      {
        path: ":id/edit",
        component: ClientEditComponent,
        resolve: [ClientsResolverService]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule {}
