import { Component } from '@angular/core';
import { ToolbarProfileComponent } from "../toolbar-profile/toolbar-profile.component";
import { AuthServiceService } from "../../../core/auth/auth-service.service";
import { Router } from '@angular/router'; // Corrigido para importar do Angular

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    ToolbarProfileComponent
  ],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'] // Corrigido para 'styleUrls'
})
export class NavBarComponent {

  constructor(private auth: AuthServiceService, private router: Router) { }

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  goToGame() {
    this.router.navigate(['interno/jogar']);
  }
}