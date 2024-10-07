import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginInterface } from '../models/login.interface';
import { environment } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private userId: number | null = null;
  private readonly url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * Verifica se localStorage está disponível.
   * @returns {boolean} - True se localStorage está disponível, false caso contrário.
   */
  private isLocalStorageAvailable(): boolean {
    try {
      const test = '__localStorageTest__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * Faz login do usuário.
   * @param {LoginInterface} user - Dados do usuário para login.
   * @returns {Observable<LoginInterface>} - Observable com os dados do usuário logado.
   */
  login(user: LoginInterface): Observable<LoginInterface> {
    return this.http.post<LoginInterface>(`${this.url}/login`, user);
  }

  /**
   * Armazena o token de autenticação no localStorage.
   * @param {string} token - O token de autenticação.
   */
  storeToken(token: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('token', token);
    }
  }

  /**
   * Recupera o token de autenticação do localStorage.
   * @returns {string | null} - O token de autenticação ou null se não encontrado.
   */
  getToken(): string | null {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem('token');
    }
    return null;
  }

  /**
   * Verifica se o usuário está logado.
   * @returns {boolean} - True se o usuário está logado, false caso contrário.
   */
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  /**
   * Decodifica e descreve o token de autenticação.
   * @returns {any} - O payload decodificado do token ou undefined se nenhum token for encontrado.
   */
  describeToken(): any {
    const token = this.getToken();
    if (token) {
      const payload = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payload));
      this.userId = decodedPayload.id;
      return decodedPayload;
    }
  }

  /**
   * Obtém o ID do usuário logado.
   * @returns {number | null} - O ID do usuário ou null se não estiver logado.
   */
  getUserId(): any {
    const token = this.getToken();
    if (token) {
      const payload = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payload));
      return this.userId = decodedPayload.id;
    }
  }

  /**
   * Faz logout do usuário.
   */
  logout(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem('token');
    }
    this.userId = null;
  }
}