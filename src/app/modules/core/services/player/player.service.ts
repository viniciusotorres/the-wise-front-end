import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private readonly url = environment.apiUrl + '/players';

  constructor(private http: HttpClient) { }

  getPlayer(id: number) {
    
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.url}/player/${id}`,{ headers });
  }

}
