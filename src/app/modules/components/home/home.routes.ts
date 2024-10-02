import {Routes} from "@angular/router";

const HomeRoutes: Routes = [
  { path: '', redirectTo: 'entrar', pathMatch: 'full' },
  {
    path: 'entrar', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  }
];

export default HomeRoutes;
