import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { MatLabel } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import {AuthServiceService} from "../../../core/auth/auth-service.service";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule, isPlatformBrowser} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatIconModule, MatLabel, MatInputModule, MatIcon, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm!: FormGroup;


  constructor(private authService: AuthServiceService,
              @Inject(PLATFORM_ID) private platformId: Object,
              private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
    this.startAnimation();
  }

  startAnimation(): void {
    if (isPlatformBrowser(this.platformId)) {
      const letters = document.querySelectorAll('.letter');
      letters.forEach((letter, index) => {
        const htmlLetter = letter as HTMLElement;
        htmlLetter.classList.add('animate');
        htmlLetter.style.animationDelay = `${index * 0.1}s`;
      });
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe((response: any) => {
          this.authService.storeToken(response.token);
          if (this.authService.isLoggedIn()) {
            this.router.navigate(['/interno']);
          }
        },
        error => {
          console.log(error);
        });
    }
  }

}
