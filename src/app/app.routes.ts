import { Routes } from '@angular/router';
import { AuthGuard } from "./modules/core/guard/auth.guard";
import { NoAuthGuard } from "./modules/core/guard/no-auth.guard";

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  {
    path: 'inicio',
    loadChildren: () => import('./modules/components/home/home.routes'),
    canActivate: [NoAuthGuard]
  },
  {
    path: 'interno',
    loadChildren: () => import('./modules/components/internal/internal.routes'),
    canActivate: [AuthGuard]
  },
  
];
