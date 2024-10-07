import { Component } from '@angular/core';
import { AnswerRequest, GameService, Question } from '../../../../core/services/game/game.service';
import { CommonModule } from '@angular/common';
import { get } from 'http';
import { AuthServiceService } from '../../../../core/auth/auth-service.service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  question!: Question;
  playerId: number = 0;
  answers!: string[];

  constructor(private gameService: GameService, private authService: AuthServiceService) { }

  ngOnInit(): void {
    this.getQuestions();
    const userId = this.authService.getUserId();
    if (userId) {
      this.playerId = userId;
    }
  }


  getQuestions() {
    this.gameService.getQuestions().subscribe(question => {
      this.question = question;
      this.answers = question.correctAnswers.concat(question.incorrectAnswers);
    });
  }

 selectAnswer(answer: string) {
    const request: AnswerRequest = {
      questionId: this.question.id,
      answer: answer,
      playerId: this.playerId
    };

    this.gameService.answerQuestion(request).subscribe(
      (response: any) => {
        alert(`${response.message} Você ganhou ${response.xpGained} XP!`);
        this.getQuestions();
      },
      (error) => {
        console.error('Erro ao enviar resposta:', error);
        alert('Ocorreu um erro ao enviar sua resposta. Tente novamente.');
      }
    );
  }
}
