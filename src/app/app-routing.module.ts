import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";

const appRoutes: Routes = [{ path: "", redirectTo: "/", pathMatch: "full" }];

const appChildRoutes: Routes = [
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: "clients",
    loadChildren: () =>
      import("./clients/clients.module").then(m => m.ClientsModule)
  },
  {
    path: "fields",
    loadChildren: () =>
      import("./fields/fields.module").then(m => m.FieldsModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
    RouterModule.forChild(appChildRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
