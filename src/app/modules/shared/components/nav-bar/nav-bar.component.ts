import { Component } from '@angular/core';
import {ToolbarProfileComponent} from "../toolbar-profile/toolbar-profile.component";
import {AuthServiceService} from "../../../core/auth/auth-service.service";

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    ToolbarProfileComponent
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

  constructor(private auth: AuthServiceService) {
  }

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }
}
