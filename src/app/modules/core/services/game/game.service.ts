import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Question {
  id: number;
  category: string;
  type: string;
  difficulty: string;
  questionText: string;
  correctAnswers: string[];
  incorrectAnswers: string[];
}

export interface AnswerRequest {
  questionId: number;
  answer: string;
  playerId: number;
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
private readonly url = environment.apiUrl + '/questions';

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<Question> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Question>(`${this.url}/random`, { headers });
  }

  answerQuestion(request: AnswerRequest): Observable<boolean> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<boolean>(`${this.url}/check`, request, { headers });
  }


}
