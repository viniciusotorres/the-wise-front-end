import { Routes } from "@angular/router";
import { AuthGuard } from "../../core/guard/auth.guard";

const InternalRoutes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  {
    path: 'inicio',
    loadComponent: () => import('./internal.component').then(m => m.InternalComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'jogar',
    loadComponent: () => import('./game/game/game.component').then(m => m.GameComponent),
    canActivate: [AuthGuard]
  }
];

export default InternalRoutes;
