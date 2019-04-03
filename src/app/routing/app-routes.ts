import { Route } from "@angular/router";
import { HomeComponent } from "../component/home/home.component";
import { SidenavComponent } from "../component/sidenav/sidenav.component";
import { LoginComponent } from "../component/login/login.component";
import { AuthGuard } from "./guards/authGuard";
import { PagenotfoundComponent } from "../component/pagenotfound/pagenotfound.component";
import { LoginGuard } from "./guards/loginGuard";
import { ReportsComponent } from "../component/home/reports/reports.component";
import { DashComponent } from "../component/home/dash/dash.component";

export const ROUTES : Route[] = [
    { path : "",redirectTo : "/home/dash",pathMatch: 'full'},
    { path : "home", component : HomeComponent ,canActivate : [AuthGuard],
    children: [
        { path: 'dash', component: DashComponent },
        { path: 'reports', component: ReportsComponent }
    ]},
    { path : "login", component : LoginComponent,canActivate : [LoginGuard]},
    {path: '404', component: PagenotfoundComponent},
    {path: '**', redirectTo: "/404"}
]

export const components = [
    HomeComponent,
    SidenavComponent,
    LoginComponent,
    PagenotfoundComponent,
    ReportsComponent,
    DashComponent
]