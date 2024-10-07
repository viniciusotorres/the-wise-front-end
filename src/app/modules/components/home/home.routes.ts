import {Routes} from "@angular/router";
import { NoAuthGuard } from "../../core/guard/no-auth.guard";

const HomeRoutes: Routes = [
  { path: '', redirectTo: 'entrar', pathMatch: 'full' },
  {
    path: 'entrar', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
    canActivate: [NoAuthGuard]
  }
];

export default HomeRoutes;
