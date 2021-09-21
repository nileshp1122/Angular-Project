import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Import Containers
import { DefaultLayoutComponent } from "./containers";

import { P404Component } from "./views/error/404.component";
import { P500Component } from "./views/error/500.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full",
  },
  {
    path: "404",
    component: P404Component,
    data: {
      title: "Page 404",
    },
  },
  {
    path: "500",
    component: P500Component,
    data: {
      title: "Page 500",
    },
  },
  {
    path: "",
    component: DefaultLayoutComponent,
    data: {
      title: "",
    },
    children: [
      {
        path: "dashboard",
        loadChildren: () => import("./views/dashboard/dashboard.module").then((m) => m.DashboardModule),
      },
      {
        path: "",
        loadChildren: () => import("./components/manage-student/manage-student.module").then((m) => m.ManageStudentModule),
      },
    ],
  },

  { path: "**", component: P404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
