import { Routes } from "@angular/router";
import { DefaultDashboardComponent } from "./default-dashboard/default-dashboard.component";
import { AnalyticsComponent } from "./analytics/analytics.component";

export const DashboardRoutes: Routes = [
  {
    path: "",
    component: AnalyticsComponent,
    data: { title: "Analytics"}
  },
  {
    path: "default",
    component: DefaultDashboardComponent,
    data: { title: "Dashboard"}
  },
];
