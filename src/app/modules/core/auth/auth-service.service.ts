import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environments';
import { LoginInterface } from '../models/login.interface';
import { Observable } from 'rxjs';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private readonly url = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient,
              private router: Router) {}

  /**
   * Logs in the user.
   * @param {LoginInterface} user - The user credentials.
   * @returns {Observable<LoginInterface>} - An observable of the login response.
   */
  login(user: LoginInterface): Observable<LoginInterface> {
    return this.http.post<LoginInterface>(`${this.url}/login`, user);
  }

  /**
   * Stores the authentication token in local storage.
   * @param {string} token - The authentication token.
   */
  storeToken(token: string): void {
    localStorage.setItem('token', token);
  }

  /**
   * Retrieves the authentication token from local storage.
   * @returns {string | null} - The authentication token or null if not found.
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Logs out the user by removing the authentication token from local storage.
   */
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/']);

  }

  /**
   * Checks if the user is logged in.
   * @returns {boolean} - True if the user is logged in, false otherwise.
   */
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  /**
   * Decodes and describes the authentication token.
   * @returns {any} - The decoded token payload or undefined if no token is found.
   */
  describeToken(): any {
    const token = this.getToken();
    if (token) {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    }
  }
}
